package graphql

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
	"go.mongodb.org/mongo-driver/mongo"
	// "github.com/redis/go-redis/v9"
	// "go.mongodb.org/mongo-driver/mongo"
	// "go.mongodb.org/mongo-driver/mongo/options"
)

type DashboardInfo struct {
	PsqlPool     *pgxpool.Pool
	MongoDB      *mongo.Database
	MongoSession *mongo.Session
}

func DashboardInfoHandler(mongoDB *mongo.Database, psqlDB *pgxpool.Pool, session *mongo.Session) *DashboardInfo {
	return &DashboardInfo{
		MongoDB:      mongoDB,
		PsqlPool:     psqlDB,
		MongoSession: session,
	}
}

func (h *DashboardInfo) DashboardSearchHandler(w http.ResponseWriter, r *http.Request) {
	var session_token string
	err := json.NewDecoder(r.Body).Decode(&session_token)
	if err != nil {
		log.Println()
	}
}
