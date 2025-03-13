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

// Root Resolver struct (shared dependencies)
type Resolver struct {
	PsqlPool     *pgxpool.Pool
	MongoDB      *mongo.Client
	MongoSession *mongo.Session
	RedisClient  *redis.Client
}

// Query returns the resolver for query fields
func (r *Resolver) Query() QueryResolver {
	return &queryResolver{r}
}

// DashBoard returns resolver for nested DashBoard fields
func (r *Resolver) DashBoard() DashBoardResolver {
	return &dashBoardResolver{r}
}

// Query resolver struct
type queryResolver struct{ *Resolver }

// DashBoard resolves the dashboard query
func (r *queryResolver) Dashboard(ctx context.Context, id string) (*model.DashBoard, error) {
	return &model.DashBoard{
		Title: "test",
	}, nil
}

// dashBoardResolver struct to handle DashBoard fields
type dashBoardResolver struct{ *Resolver }

// DashBoard returns the resolver for nested fields within DashBoard type
func (r *Resolver) DashBoard() DashBoardResolver {
	return &dashBoardResolver{r}
}

// User resolves the nested `user` field on DashBoard type
func (r *dashBoardResolver) User(ctx context.Context, obj *model.DashBoard, id string) (*model.User, error) {
	collection := r.MongoDB.Database("GraphQL").Collection("user")
	redisclient := r.RedisClient
	var usr model.User

	result, err := redisclient.HGetAll(ctx, id).Result()
	if err != nil || len(result) == 0 {
		log.Println("Redis miss, fetching user from MongoDB.")
		if err := collection.FindOne(ctx, bson.M{"user_id": id}).Decode(&usr); err != nil {
			log.Println("Can't retrieve user info from MongoDB:", err)
			return nil, err
		}
		log.Println("Caching user info in Redis now")
		redisclient.HSet(ctx, id, map[string]interface{}{
			"username":   usr.Username,
			"occupation": usr.Occupation,
			"networks":   usr.Networks,
			"posts":      usr.Posts,
		})
	} else {
		log.Println("Retrieved user from Redis cache")
		usr.Username = result["username"]
		// You can populate other fields similarly from Redis here
	}

	return &usr, nil
}

// DashBoard returns the resolver implementation for DashBoard fields
func (r *Resolver) DashBoard() DashBoardResolver {
	return &dashBoardResolver{r}
}

// Resolver Interfaces (auto-generated but included here for clarity)
type QueryResolver interface {
	Dashboard(ctx context.Context, id string) (*model.DashBoard, error)
}

type DashBoardResolver interface {
	User(ctx context.Context, obj *model.DashBoard, id string) (*model.User, error)
}

// Query resolver struct
type queryResolver struct{ *Resolver }
