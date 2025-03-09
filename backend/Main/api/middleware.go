package Api

import (
	"context"
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

			if r.URL.Path == "/callback" || r.URL.Path == "/linkedin/callback" || r.URL.Path == "/login" || r.URL.Path == "/signup" {
				next.ServeHTTP(w, r.WithContext(ctxt))
				return
			}
			log.Println("authenticateProtector is verifying")
			cookie, err := r.Cookie("session_token")
			if err != nil || cookie.Value == "" {
				log.Printf("Session_ token missed, Not signed in yet")

				http.Redirect(w, r, fmt.Sprintln(frontendURL+"login"), http.StatusBadRequest)
				return
			}
			usertoken := cookie.Value
			log.Println("user is found", usertoken)

			next.ServeHTTP(w, r.WithContext(ctxt))
			return
		})
	}
}

// using Google or LinkedIn instead

func MiddleWareOAUTH(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		log.Println("middlewareOAUTH is working")
		if r.URL.Path == "/callback" || r.URL.Path == "/linkedin/callback" || r.URL.Path == "/login" || r.URL.Path == "/signup" {
			next.ServeHTTP(w, r)
			return
		}
		cookie, err := r.Cookie("session_token")
		if err != nil {
			log.Printf("Not signed in yet")
			return
		}
		usertoken := cookie.Value
		log.Println("user is found", usertoken)

		http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusFound)
	})
}
