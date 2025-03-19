package Api

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"
)

type MongoDBcontext struct {
	DB      *mongo.Database
	Session mongo.Session
}

// checking if the user is logged in already or not for EVERY single request
func AuthenticateProtector(frontendURL string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ctxt := context.WithValue(r.Context(), "FrontendURL", frontendURL)
			log.Println("frontendURL", frontendURL)
			if r.URL.Path == "/callback" || r.URL.Path == "/linkedin/callback" || r.URL.Path == "/login" || r.URL.Path == "/signup" {
				next.ServeHTTP(w, r.WithContext(ctxt))
				return
			}
			log.Println("authenticateProtector is verifying")
			cookie, err := r.Cookie("session_token")
			if err != nil || cookie.Value == "" {

				log.Printf("Session_ token missed, Not signed in yet")
				if r.Header.Get("Content-Type") == "application/json" {
					w.WriteHeader(http.StatusUnauthorized)
					json.NewEncoder(w).Encode(map[string]string{"error": "Unauthorized"})
					return
				}
				http.Redirect(w, r, fmt.Sprintln(frontendURL+"/login"), http.StatusBadRequest)
				return
			}
			usertoken := cookie.Value
			log.Println("user is found", usertoken)
			next.ServeHTTP(w, r.WithContext(ctxt))

		})
	}
}
