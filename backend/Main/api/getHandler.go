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
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

type DBInfo struct {
	PsqlPool     *pgxpool.Pool
	MongoDB      *mongo.Database
	MongoSession *mongo.Session
}

type user struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
}

/*Google and LinkedIn Oauth config*/
var googleconfig = &oauth2.Config{
	ClientID:     "70931151165-akujq6qnfukkn66heiuj51lfju7lvnod.apps.googleusercontent.com",
	ClientSecret: "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",
	RedirectURL:  "http://localhost:5050/callback",
	Endpoint:     google.Endpoint,
	Scopes:       []string{"openid", "profile", "email"},
}
var linkedInconfig = &oauth2.Config{
	ClientID:     "77nme6nzlhmnlv",
	ClientSecret: "WPL_AP1.U7xavECHgwKAnUkK.zu3mHw==",
	Scopes:       []string{"openid", "profile", "email"},
	RedirectURL:  "http://localhost:5050/linkedin/callback",
	Endpoint: oauth2.Endpoint{
		AuthURL:   "https://www.linkedin.com/oauth/v2/authorization",
		TokenURL:  "https://www.linkedin.com/oauth/v2/accessToken",
		AuthStyle: oauth2.AuthStyleInParams,
	},
}

func LoginInfo(mongoDB *mongo.Database, psqlDB *pgxpool.Pool, session *mongo.Session) *DBInfo {
	return &DBInfo{
		MongoDB:      mongoDB,
		PsqlPool:     psqlDB,
		MongoSession: session,
	}
}

func (h *DBInfo) LoginHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("login handler is called")
	ctxt := context.Background()
	frontendURL := r.Context().Value("FrontendURL").(string)
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
	err1 := sqltable.QueryRow(ctxt, "SELECT uuid FROM userinfo WHERE username=$1 AND password=$2", username, password).Scan(&UserID)
	if err1 != nil {
		if err1 == pgx.ErrNoRows {
			log.Println("user is not found")
			http.Redirect(w, r, fmt.Sprint(frontendURL+"signup"), http.StatusBadRequest)
			return
		}
		http.Error(w, "Database Error", http.StatusInternalServerError)
		return
	}

	// foundErr := dbCollection.FindOne(r.Context(), bson.M{
	// 	"UserName": user.UserName,
	// 	"Password": user.Password,
	// }).Decode(&user)
	// log.Println("User", user)
	// if foundErr != nil {
	// 	if foundErr == mongo.ErrNoDocuments {
	// 		frontURL := r.Context().Value("FrontendURL").(string)
	// 		log.Println("User not existed yet")
	// 		http.Redirect(w, r, fmt.Sprint(frontURL+"signup"), http.StatusSeeOther)

	// 		return
	// 	}
	// 	http.Error(w, "User not found", http.StatusInternalServerError)
	// 	log.Printf("Database error: %v", foundErr)
	// 	return
	// }
	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    UserID.String(),
		Path:     "/",
		HttpOnly: true,
		MaxAge:   86400,
		SameSite: http.SameSiteLaxMode,
		Secure:   false,
	})

	//send response in JSON format
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Login Successful",

		"uuid": UserID.String(),
	})

}

// signup handler
func (h *DBInfo) SignupHandler(w http.ResponseWriter, r *http.Request) {
	psqlPool := h.PsqlPool
	ctxt := context.Background()
	FrontendURL := r.Context().Value("FrontendURL").(string)
	var user user
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Println("Invalid Request Body")
		http.Error(w, "Invalid Request Body", http.StatusBadRequest)
		return
	}
	userName := user.UserName
	password := user.Password
	log.Println("userName: ", userName)
	log.Println("password", password)
	err1 := psqlPool.QueryRow(ctxt, "SELECT username, password FROM userinfo WHERE username=$1 AND password=$2", userName, password).Scan(&userName, &password)
	if err1 != nil {
		if err1 == pgx.ErrNoRows {

			log.Printf("signing the user %v up", userName)
			uuid := uuid.New()
			_, err2 := psqlPool.Exec(ctxt, "INSERT INTO userinfo (username, password, uuid) values ($1,$2,$3)", userName, password, uuid)
			if err2 != nil {
				http.Error(w, "Errors with Signing up", http.StatusBadRequest)
				return
			}

			log.Println("Signing up successfully")
			http.Redirect(w, r, fmt.Sprintln(FrontendURL+"/login"), http.StatusSeeOther)
			return
		}
	}
	log.Println("user is already exist")
	http.Redirect(w, r, fmt.Sprintln(FrontendURL+"/login"), http.StatusSeeOther)
	return
}

// this is for the linkedin server
func LinkedInCallbackHandler(w http.ResponseWriter, r *http.Request) {
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

	// send response in JSON format

	email := linkedinInfo["email"].(string)
	log.Println("email", email)
	// store as Cookie

	http.SetCookie(
		w, &http.Cookie{
			Name:     "session_token",
			Value:    email,
			Path:     "/",
			HttpOnly: true,
			MaxAge:   86400,
			Secure:   false,
		})

	http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusSeeOther)

}

// this is for google server
func (h *DBInfo) CallbackHandler(w http.ResponseWriter, r *http.Request) {

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
		if err1 == pgx.ErrNoRows {
			_, err1 := psql.Exec(context, "INSERT INTO userinfo (username, password ,uuid, email) values  ($1, $2, $3, $4)", username, "000000", uuid1, email)
			if err1 != nil {
				log.Println("can't sign up with google oauth")
			}
			log.Println("sign up with user successfully")
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
			Secure:   false,
		})
	http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusSeeOther)

}
