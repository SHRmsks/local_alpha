package Api

import (
	"encoding/json"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type user struct {
	UserName string `bson:"UserName"`
	Password string `bson:"Password"`
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
