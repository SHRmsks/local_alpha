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

func MiddleWare(db *mongo.Database) func(http.Handler) http.Handler {
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
