package main

import (
	"context"
	"fmt"

	"log"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/lpernett/godotenv"
	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	Api "iperuranium.com/backend/Main/api"
	graph "iperuranium.com/backend/graph"
)

func main() {
	// load configuration
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Println("Environment variables loaded successfully")
	port := os.Getenv("PORT") // backend port

	frontEND_PORT := os.Getenv("FRONTEND_PORT")
	log.Println("frontend port: ", frontEND_PORT)
	domainName := os.Getenv("DomainName")
	if domainName == "" {
		domainName = ""
	}

	// go rountine to initilize the database
	/*all the credentials we needed */
	Mongodb := os.Getenv("DBURL")
	PSQLdb := os.Getenv("PSQLURL")
	googleClientSecret := os.Getenv("googleClientSecret")
	linkedinClientSecret := os.Getenv("linkedinClientSecret")
	redisAddr := os.Getenv("redisAddr")
	redisPass := os.Getenv("redisPassword")

	r := chi.NewRouter()

	/*backend Server*/
	server := &http.Server{
		Addr:    port,
		Handler: r,
	}
	var mongoClient *mongo.Client
	var psqlClient *pgxpool.Pool

	var wg sync.WaitGroup
	wg.Add(3)
	done := make(chan struct{})
	var timeout = time.After(45 * time.Second)
	var rdb *redis.Client
	go func() {
		defer wg.Done()
		rdb = redis.NewClient(&redis.Options{
			Addr:         redisAddr,
			Password:     redisPass,
			DB:           0,
			DialTimeout:  10 * time.Second,
			ReadTimeout:  10 * time.Second,
			WriteTimeout: 20 * time.Second,
		})

	}()
	// Initialize mongo db database
	go func() {
		defer wg.Done()
		contxt, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel() // Ensure context is canceled after use

		client, errMongo := mongo.Connect(contxt, options.Client().ApplyURI(Mongodb))
		if errMongo != nil {
			log.Fatalf("Error connecting to Mongodb: %v", err)
			return
		}
		mongoClient = client
	}()
	go func() {
		defer wg.Done()
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		conn, err := pgxpool.New(ctx, fmt.Sprint(PSQLdb+"USER"))
		if err != nil {
			log.Fatalf("Error connecting to Postgre: %v", err)

			return

		}
		psqlClient = conn
	}()
	go func() {
		wg.Wait()
		close(done)
	}()

	select {
	case <-done:
		log.Println("connections all Successful")

	case <-timeout:
		log.Fatalf("Connection to Database timed out")
	}
	mongoSession, err := mongoClient.StartSession()
	if err != nil {
		log.Fatalf("Having trouble starting mongo Session")
	}
	gqlResolver := &graph.Resolver{
		PsqlPool:     psqlClient,
		MongoDB:      mongoClient,
		MongoSession: &mongoSession,
		RedisClient:  rdb,
	}

	DBinfo := Api.LoginInfo(mongoClient.Database("User"), psqlClient, &mongoSession, googleClientSecret, linkedinClientSecret)
	executableSchema := graph.NewExecutableSchema(graph.Config{
		Resolvers: gqlResolver,
	})
	gqlHandler := handler.NewDefaultServer(executableSchema)
	// middleWare
	r.Use(middleware.Logger)
	// Cors set up
	r.Group(func(publicURL chi.Router) {
		publicURL.Use(cors.Handler(
			cors.Options{
				AllowedOrigins:   []string{"*"}, // alllow any public urls
				AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
				AllowedHeaders:   []string{"Accept", "Content-Type", "Authorization"},
				AllowCredentials: true,
				MaxAge:           300,
			},
		))
	})
	r.Group(
		func(privateURL chi.Router) {
			privateURL.Use(cors.Handler(
				cors.Options{
					AllowedOrigins:   []string{fmt.Sprintf("https://%v.com", domainName), fmt.Sprintf("http://localhost:%v", frontEND_PORT)}, // alllow any public url
					AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
					AllowedHeaders:   []string{"Accept", "Content-Type", "Authorization"},
					AllowCredentials: true,
					MaxAge:           300,
				},
			),
			)
			// privateURL.Use(Api.AuthenticateProtector("http://localhost:3000/"))
			// privateURL.Use(Api.MiddleWareOAUTH)
			privateURL.Options("/", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Options("/login", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Options("/signup", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Options("/logcallback", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Options("/linkedin/callback", func(w http.ResponseWriter, r *http.Request) {})
			// privateURL.Handle("/", playground.Handler("GraphQL playground", "/Search"))
			privateURL.Handle("/", playground.Handler("GraphQL playground", "/Search"))
			privateURL.Post("/login", DBinfo.LoginHandler)
			privateURL.Post("/signup", DBinfo.SignupHandler)
			privateURL.Get("/callback", DBinfo.GoogleCallbackHandler)
			privateURL.Handle("/Search", gqlHandler)
			privateURL.Get("/linkedin/callback", DBinfo.LinkedInCallbackHandler)

		},
	)

	// main routes

	log.Println("Server is running on port", port)

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server failed: %v", err)
	}
}
