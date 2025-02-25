package Api

import (
	"encoding/json"
	"log"
	"net/http"
)

type user struct {
	UserName string `json:"userName"`
	Password string `json:"password"`
	UserID   int64  `json:"userID"`
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("login handler is called")
	// parser logic
	var user user
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Println("Error on getting user information")
	}

	w.Write([]byte("login handler"))
}
