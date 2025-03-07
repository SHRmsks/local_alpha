package Api

import (
	"log"
	"net/http"

	"go.mongodb.org/mongo-driver/mongo"
)

type MongoDBcontext struct {
	DB      *mongo.Database
	Session mongo.Session
}

// checking if the user is logged in already or not for every single request
func AuthenticateProtector(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/callback" || r.URL.Path == "/linkedin/callback" || r.URL.Path == "/login" {
			next.ServeHTTP(w, r)
			return
		}
		log.Println("authenticateProtector is working")
		cookie, err := r.Cookie("session_token")
		if err != nil || cookie.Value == "" {
			log.Printf("Not signed in yet")
			http.Redirect(w, r, "http://localhost:3000/login", http.StatusBadRequest)
			return
		}
		userEmail := cookie.Value
		log.Println("user is found", userEmail)

		next.ServeHTTP(w, r)
		return
	})
}

// using Google or LinkedIn instead
func MiddleWareOAUTH(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		log.Println("middlewareOAUTH is working")
		if r.URL.Path == "/callback" || r.URL.Path == "/linkedin/callback" || r.URL.Path == "/login" {
			next.ServeHTTP(w, r)
			return
		}
		cookie, err := r.Cookie("session_token")
		if err != nil {
			log.Printf("Not signed in yet")
			return
		}
		userEmail := cookie.Value
		log.Println("user is found", userEmail)

		http.Redirect(w, r, "http://localhost:3000/dashboard", http.StatusFound)
	})
}

// // pass here for checking user info
// func MiddleWareLOGIN(db *mongo.Database, psql *pgxpool.Pool) func(http.Handler) http.Handler {
// 	return func(next http.Handler) http.Handler {
// 		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 			log.Println("middleWare is working")

// 			newSession, err := db.Client().StartSession()

// 			if err != nil {
// 				http.Error(w, "Error starting session", http.StatusInternalServerError)
// 				return
// 			}
// 			defer newSession.EndSession(r.Context())

// 			ctx := context.WithValue(r.Context(), "PsqlDB", psql)
// 			ctx = context.WithValue(ctx, "MongoDB", MongoDBcontext{
// 				DB:      db,
// 				Session: newSession,
// 			})

// 			next.ServeHTTP(w, r.WithContext(ctx))
// 		})
// 	}

// }
