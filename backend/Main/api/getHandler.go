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
)

type user struct {
	UserName string `bson:"UserName"`
	Password string `bson:"Password"`
}

var config = &oauth2.Config{
	ClientID:     "70931151165-akujq6qnfukkn66heiuj51lfju7lvnod.apps.googleusercontent.com",
	ClientSecret: "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",
	RedirectURL:  "http://localhost:5050/callback",
	Endpoint:     google.Endpoint,
	Scopes:       []string{"openid", "profile", "email"},
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
	var user user
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

func CallbackHandler(w http.ResponseWriter, r *http.Request) {

	log.Println("callback handler is called")
	context := r.Context()

	tempCode := r.URL.Query().Get("code")
	if tempCode == "" {
		http.Error(w, "Error with Google Server", http.StatusBadRequest)
		return
	}

	token, err := config.Exchange(context, tempCode)

	if err != nil {
		http.Error(w, "Error with Google Server", http.StatusInternalServerError)
		return
	}

	// get the token and use it for authentication from Google Server
	idToken := token.Extra("id_token").(string)
	client := config.Client(context, token)
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
			MaxAge:   86400,
			Secure:   false,
		})

}
