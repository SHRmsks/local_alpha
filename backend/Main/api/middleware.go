package Api
import (
	"context"
	"log"
	"net/http"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserContext struct {
	UUID    int64
	Session mongo.Session
}

type DBcontext struct {
	DB       *mongo.Database
	UserCtxt UserContext
}
// checking if the user is logged in already or not for every single request 
func AuthenticateProtector(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if r.URL.Path == "/callback"{
			next.ServeHTTP(w, r)
			return
		}
		log.Println("authenticateProtector is working")
        cookie, err := r.Cookie("session_token")
        if err != nil || cookie.Value== ""{
            log.Printf("Not signed in yet")
        	http.Redirect(w,r, "http://localhost:3000/login",http.StatusBadRequest)
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
		 if r.URL.Path == "/callback" {
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
		http.Redirect(w, r, "http://localhost:3000/dashBoard", http.StatusFound)
	})
}

// only pass here if user is using traditional username and password
func MiddleWareLOGIN(db *mongo.Database) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			log.Println("middleWare is working")
			newSession, err := db.Client().StartSession()
			if err != nil {
				http.Error(w, "Error starting session", http.StatusInternalServerError)
				return
			}
			defer newSession.EndSession(r.Context())
			ctx := context.WithValue(r.Context(), "DB", DBcontext{
				DB: db,
				UserCtxt: UserContext{
					UUID:    int64(uuid.New().ID()),
					Session: newSession,
				},
			})
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}

}