package graph

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"iperuranium.com/backend/graph/model"
)

type Resolver struct {
	PsqlPool     *pgxpool.Pool
	MongoDB      *mongo.Client
	MongoSession *mongo.Session
	RedisClient  *redis.Client
}

func (r *dashBoardResolver) User(ctx context.Context, obj *model.DashBoard, id string) (*model.User, error) {
	Collection := r.MongoDB.Database("GraphQL").Collection("user")
	// mongosession := r.MongoSession
	redisclient := r.RedisClient
	_, err := redisclient.HGetAll(ctx, id).Result()
	var usr model.User
	if err != nil {
		log.Println("redis doesn't have this person info yet, fetching now ...")
		err1 := Collection.FindOne(ctx, bson.M{"user_id": id}).Decode(&usr)
		if err1 != nil {
			log.Println(" can't get user's info", err1)
			return nil, err1
		}
		log.Println("setting up redis now")
		redisclient.HSet(ctx, id, map[string]interface{}{"username": usr.Username, "Occupation": usr.Occupation, "Networks": usr.Networks, "Posts": usr.Posts})
		return &usr, nil
	}
	return &usr, nil

}
func (r *queryResolver) DashBoard(ctx context.Context, id string) (*model.DashBoard, error) {

	return &model.DashBoard{

		Title: "test",
	}, nil

}

// need to follow the step-up structure
type dashBoardResolver struct{ *Resolver }

type DashBoardResolver interface {
	User(ctx context.Context, obj *model.DashBoard, id string) (*model.User, error)
}
