package Api

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"Main/models"
)

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

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("login handler is called")
	var dbCollection *mongo.Collection
	var uuid int64
	var session mongo.Session
	switch v := r.Context().Value("DB").(type) {
	case DBcontext:
		{
			dbCollection = v.DB.Collection("loginInfo")
			uuid = v.UserCtxt.UUID
			session = v.UserCtxt.Session
		}
	default:
		http.Error(w, "Couldn't Fetch database information or User", http.StatusInternalServerError)
		log.Fatal("Couldn't Fetch database information or User")
		return
	}

	// parser logic
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		log.Println("Error on getting user information")
		return
	}
	// check if user exists in database
	foundErr := dbCollection.FindOne(r.Context(), bson.M{
		"UserName": user.UserName,
		"Password": user.Password,
	}).Decode(&user)
	log.Println("User", user)
	if foundErr != nil {
		if foundErr == mongo.ErrNoDocuments {
			http.Error(w, "User not found", http.StatusNotFound)
			log.Println("User not found")
			return
		}
		http.Error(w, "User not found", http.StatusInternalServerError)
		log.Printf("Database error: %v", foundErr)
		return
	}

	//send response in JSON format
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message":   "Login Successful",
		"userID":    uuid,
		"sessionID": session.ID(),
	})
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
func CallbackHandler(w http.ResponseWriter, r *http.Request) {

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
	email, ok := googleInfo["email"]
	if !ok {
		http.Error(w, "Error with Google Server", http.StatusInternalServerError)
		return
	}
	log.Println("Token info: ", email)

	http.SetCookie(
		w, &http.Cookie{
			Name:     "session_token",
			Value:    email.(string),
			HttpOnly: true,
			Path:     "/",
			MaxAge:   86400,
			Secure:   false,
		})
	http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusSeeOther)

}
