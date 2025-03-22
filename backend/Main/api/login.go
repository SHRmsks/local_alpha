package Api

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type DBInfo struct {
	PsqlPool             *pgxpool.Pool
	MongoDB              *mongo.Database
	MongoSession         *mongo.Session
	googleClientSecret   string
	linkedinClientSecret string
}

type user struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}
type userSignup struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

func LoginInfo(mongoDB *mongo.Database, psqlDB *pgxpool.Pool, session *mongo.Session, googlesecret string, linkedinsecret string) *DBInfo {
	return &DBInfo{
		MongoDB:              mongoDB,
		PsqlPool:             psqlDB,
		MongoSession:         session,
		googleClientSecret:   googlesecret,
		linkedinClientSecret: linkedinsecret,
	}
}

func (h *DBInfo) LoginHandler(w http.ResponseWriter, r *http.Request) {
	// frontendURL := r.Context().Value("FrontendURL").(string)
	log.Println("login handler is called")
	ctxt := context.Background()

	// var dbCollection *mongo.Collection = h.MongoDB.Collection("loginInfo")
	var sqltable *pgxpool.Pool = h.PsqlPool
	// var session mongo.Session = *h.MongoSession

	var user user
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		log.Printf("JSON decode error: %v", err)
		log.Println("Error on getting user information")
		return
	}
	// check if user exists in database
	username := user.UserName
	password := user.Password

	var UserID uuid.UUID
	var psswrd []byte
	err1 := sqltable.QueryRow(ctxt, "SELECT uuid, psswrd FROM userinfo WHERE email=$1", username).Scan(&UserID, &psswrd)
	if err1 != nil {
		if err1 == pgx.ErrNoRows {
			log.Println("user is not found")
			// log.Println("fwf", fmt.Sprint(frontendURL+"/signup"))

			http.Error(w, "user not found", http.StatusBadRequest)
			// http.Redirect(w, r, fmt.Sprintf(frontendURL+"/login"), http.StatusSeeOther)

			return
		}
		http.Error(w, "Database Error", http.StatusInternalServerError)
		return
	}
	err3 := bcrypt.CompareHashAndPassword(psswrd, []byte(password))
	if err3 != nil {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "unsuccessful",
		})
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    UserID.String(),
		Path:     "/",
		HttpOnly: true,
		MaxAge:   86400,

		Secure: false,
	})

	//send response in JSON format
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "successful",
		"uuid":    UserID.String(),
	})

}

// signup handler
func (h *DBInfo) SignupHandler(w http.ResponseWriter, r *http.Request) {
	psqlPool := h.PsqlPool
	ctxt := context.Background()
	// FrontendURL := r.Context().Value("FrontendURL").(string)
	var user userSignup
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Println("Invalid Request Body")
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}
	userName := user.UserName
	password := user.Password
	email := user.Email
	log.Println("userName: ", userName)
	log.Println("email: ", email)
	log.Println("password", password)

	err1 := psqlPool.QueryRow(ctxt, "SELECT username, email FROM userinfo WHERE username=$1 AND email=$2", userName, email).Scan(&userName, &email)

	if err1 != nil {
		if err1 == pgx.ErrNoRows {

			log.Printf("signing the user %v up", userName)
			uuid := uuid.New()
			psswrd, err3 := bcrypt.GenerateFromPassword([]byte(password), 10)
			if err3 != nil {
				log.Println("can't generate the password", psswrd)
				http.Error(w, "can't creating hash for password", http.StatusBadRequest)
				return
			}

			_, err2 := psqlPool.Exec(ctxt, "INSERT INTO userinfo (username, uuid, email, psswrd) values ($1,$2,$3, $4)", userName, uuid, email, psswrd)
			if err2 != nil {
				http.Error(w, "Errors with Signing up", http.StatusBadRequest)
				return
			}

			log.Println("Signing up successfully")
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusAccepted)
			json.NewEncoder(w).Encode(map[string]interface{}{
				"message": "Successful",
				"uuid":    uuid.String(),
			})
			return
		}
	}

	return
}

// this is for the linkedin server
func (h *DBInfo) LinkedInCallbackHandler(w http.ResponseWriter, r *http.Request) {
	frontendURL := r.Context().Value("FrontendURL").(string)
	log.Println("linkedin call", frontendURL)
	var linkedInconfig = &oauth2.Config{
		ClientID:     "77nme6nzlhmnlv",
		ClientSecret: h.linkedinClientSecret,
		Scopes:       []string{"openid", "profile", "email"},
		RedirectURL:  "http://localhost:5050/linkedin/callback",
		Endpoint: oauth2.Endpoint{
			AuthURL:   "https://www.linkedin.com/oauth/v2/authorization",
			TokenURL:  "https://www.linkedin.com/oauth/v2/accessToken",
			AuthStyle: oauth2.AuthStyleInParams,
		},
	}
	log.Println("linkedIn callback handler is called")
	context := r.Context()
	tempCode := r.URL.Query().Get("code")
	if tempCode == "" {
		http.Error(w, "Error with LinkedIn Server", http.StatusBadRequest)
		return
	}
	token, err := linkedInconfig.Exchange(context, tempCode)
	if err != nil {
		log.Printf("LinkedIn token exchange error: %v", err)
		http.Error(w, "Error with LinkedIn Server", http.StatusInternalServerError)
		return
	}
	idToken := token.AccessToken
	log.Println("linkedin token", idToken)
	// verify the token
	var linkedinInfo map[string]interface{}

	req, err := http.NewRequest("GET", "https://api.linkedin.com/v2/userinfo", nil)
	if err != nil {
		http.Error(w, "Error with Signing in LinkedIn Server", http.StatusInternalServerError)
		return
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %v", idToken))

	// constructing http request for finding user info
	client := &http.Client{}
	res, err := client.Do(req)

	if err != nil {
		http.Error(w, "Error with Signing in LinkedIn Server", http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	err = json.NewDecoder(res.Body).Decode(&linkedinInfo)
	if err != nil {
		http.Error(w, "Error with Signing in LinkedIn Server", http.StatusInternalServerError)

		return
	}
	// log.Println("linedinInfo", linkedinInfo)

	// send response in JSON format

	email := linkedinInfo["email"].(string)
	name := linkedinInfo["name"].(string)

	psql := h.PsqlPool
	var uuid1 uuid.UUID
	err1 := psql.QueryRow(context, "SELECT uuid FROM userinfo WHERE email=$1", email).Scan(&uuid1)
	if err1 != nil {
		if err1 == pgx.ErrNoRows {
			log.Println("signing up user right now")
			uuid1 = uuid.New()
			psswrd, err3 := bcrypt.GenerateFromPassword([]byte("000000"), 10)
			if err3 != nil {
				log.Println("can't create hash salt for user")
				return
			}
			_, err2 := psql.Exec(context, "INSERT INTO userinfo (username, password, uuid, email, provider) VALUES ($1,$2,$3,$4,$5)", name, psswrd, uuid1, email, 0)
			if err2 != nil {
				log.Println("Couldn't sign user up through linkedin, err msg: ", err2)
			}

		} else {
			log.Println("Couldn't sign user up through linkedin, err msg: ", err1)
			return
		}
	}

	// store as Cookie

	http.SetCookie(
		w, &http.Cookie{
			Name:     "session_token",
			Value:    uuid1.String(),
			Path:     "/",
			HttpOnly: true,
			MaxAge:   86400,
			SameSite: http.SameSiteLaxMode,
			// Secure:   true,
		})
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	// http.Redirect(w, r, fmt.Sprintf("https://www.iperuranium.com/dashboard?session=%v", uuid1.String()), http.StatusSeeOther)
	http.Redirect(w, r, fmt.Sprintf("http://localhost:3000/dashboard?session=%v", uuid1.String()), http.StatusSeeOther)

}

// this is for google server
func (h *DBInfo) GoogleCallbackHandler(w http.ResponseWriter, r *http.Request) {
	//
	frontendURL := r.Context().Value("FrontendURL").(string)
	log.Println("google call", frontendURL)
	var googleconfig = &oauth2.Config{
		ClientID:     "43488699135-6muejl3ggsu962hcav4qc1shuo3jesat.apps.googleusercontent.com",
		ClientSecret: h.googleClientSecret,
		RedirectURL:  "http://localhost:5050/callback",
		Endpoint:     google.Endpoint,
		Scopes:       []string{"openid", "profile", "email"},
	}
	log.Println("callback handler is called")
	context := r.Context()

	tempCode := r.URL.Query().Get("code")
	if tempCode == "" {
		http.Error(w, "Error with Google Server", http.StatusBadRequest)
		return
	}

	token, err := googleconfig.Exchange(context, tempCode)

	if err != nil {
		http.Error(w, "Error with Google Server", http.StatusInternalServerError)
		return
	}

	// get the token and use it for authentication from Google Server
	idToken := token.Extra("id_token").(string)
	client := googleconfig.Client(context, token)
	res, err := client.Get(fmt.Sprintf("https://oauth2.googleapis.com/tokeninfo?id_token=%v", idToken))
	if err != nil {
		http.Error(w, "Error with Google Server", http.StatusInternalServerError)
		return
	}
	defer res.Body.Close()

	var googleInfo map[string]interface{}
	err = json.NewDecoder(res.Body).Decode(&googleInfo)
	if err != nil {
		http.Error(w, "Error with Google Server", http.StatusInternalServerError)
		return
	}
	email, ok1 := googleInfo["email"].(string)
	username, ok2 := googleInfo["name"].(string)
	if !ok1 || !ok2 {
		http.Error(w, "Error with Google Server", http.StatusInternalServerError)
		return
	}
	var uuid1 uuid.UUID

	psql := h.PsqlPool
	err1 := psql.QueryRow(context, "SELECT uuid FROM userinfo WHERE email=$1", email).Scan(&uuid1)
	if err1 != nil {
		uuid1 = uuid.New()
		psswrd, err3 := bcrypt.GenerateFromPassword([]byte("000000"), 10)
		if err3 != nil {
			log.Println("can't create hash salt for user")
			return
		}
		if err1 == pgx.ErrNoRows {
			_, err1 := psql.Exec(context, "INSERT INTO userinfo (username, psswrd ,uuid, email, provider) values  ($1, $2, $3, $4, $5)", username, psswrd, uuid1, email, 1)
			if err1 != nil {
				log.Println("can't sign up with google oauth")
			} else {
				log.Println("sign up with user successfully")
			}

		} else {
			log.Println("Couldn't sign user up through google , err msg: ", err1)
			return
		}
	}

	log.Println("Token info: ", email, username, uuid1)

	http.SetCookie(
		w, &http.Cookie{
			Name:     "session_token",
			Value:    uuid1.String(),
			HttpOnly: true,
			Path:     "/",
			MaxAge:   86400,
			SameSite: http.SameSiteLaxMode,
			// Secure:   true,
		})
	w.Header().Set("Access-Control-Allow-Origin", frontendURL)
	w.Header().Set("Access-Control-Allow-Credentials", "true")
	// http.Redirect(w, r, fmt.Sprintf("https://www.iperuranium.com/dashboard?session=%v", uuid1.String()), http.StatusSeeOther)
	http.Redirect(w, r, fmt.Sprintf("http://localhost:3000/dashboard?session=%v", uuid1.String()), http.StatusSeeOther)

}
