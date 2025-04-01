package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"sync"
	"time"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-redis/redis/v9"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/lpernett/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	Api "iperuranium.com/backend/Main/api"
	graph "iperuranium.com/backend/graph"
)

type AuroraSecret struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Host     string `json:"host"`
	Port     int    `json:"port"`
	DBName   string `json:"dbname"`
}

func heartbeats(pool *pgxpool.Pool, ctx context.Context) {
	timeout := time.NewTicker(10 * time.Minute)
	log.Println("called heartbeats")
	defer timeout.Stop()
	_, err := pool.Query(ctx, "SELECT 1")
	if err != nil {
		log.Panicln("Database down, ", err)
		return
	}
	for range timeout.C {
		select {
		case <-ctx.Done():
			log.Println("shutting down gracefully")
			return
		default:
			_, err := pool.Query(ctx, "SELECT 1")
			if err != nil {
				log.Fatalln("Database down, ", err)
			} else {
				log.Println("sending Heartbeats successfully", timeout.C)
			}

		}

	}
}
func main() {
	// load configuration
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Println("Environment variables loaded successfully")

	port := os.Getenv("PORT") // backend port
	apiPort := os.Getenv("apiPORT")
	frontEND_PORT := os.Getenv("FRONTEND_PORT")
	// log.Println("frontend port: ", frontEND_PORT)
	domainName := os.Getenv("DomainName")

	Mongodb := os.Getenv("DBURL")
	PSQLURL := os.Getenv("PSQLURL")
	googleClientSecret := os.Getenv("googleClientSecret")
	linkedinClientSecret := os.Getenv("linkedinClientSecret")
	redisAddr := os.Getenv("redisAddr")
	redisPass := os.Getenv("redisPassword")

	r := chi.NewRouter()

	/*backend Server*/
	server := &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}
	var mongoClient *mongo.Client

	var pgPool *pgxpool.Pool
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

		config, _ := pgxpool.ParseConfig(PSQLURL)
		config.ConnConfig.DialFunc = (&net.Dialer{
			LocalAddr: &net.TCPAddr{IP: net.IPv4zero},
			KeepAlive: 30 * time.Second,
			DualStack: false,
		}).DialContext
		conn, err := pgxpool.NewWithConfig(context.Background(), config)
		if err != nil {
			log.Fatalf("Error connecting to Postgre: %v", err)

			return

		}
		pgPool = conn
		go heartbeats(pgPool, context.Background())

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
		PsqlPool:     pgPool,
		MongoDB:      mongoClient,
		MongoSession: &mongoSession,
		RedisClient:  rdb,
	}

	DBinfo := Api.LoginInfo(mongoClient.Database("User"), pgPool, &mongoSession, googleClientSecret, linkedinClientSecret)
	executableSchema := graph.NewExecutableSchema(graph.Config{
		Resolvers: gqlResolver,
	})
	gqlHandler := handler.NewDefaultServer(executableSchema) // this will be replaced by New once the playground is not used

	// middleWare
	r.Use(middleware.Logger)

	// Cors set up
	r.Group(func(publicURL chi.Router) {
		publicURL.Use(cors.Handler(
			cors.Options{
				AllowedOrigins:   []string{"http://*", "https://*"}, // alllow any public urls
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
					AllowedOrigins:   []string{fmt.Sprintf("https://%v.com", domainName), fmt.Sprintf("https://%v.com", apiPort), fmt.Sprintf("http://localhost:%v", frontEND_PORT), fmt.Sprintf("http://localhost:%v", port)},
					AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
					AllowedHeaders:   []string{"Accept", "Content-Type", "Authorization", "X-CSRF-Token"},
					AllowCredentials: true,
					MaxAge:           300,
				},
			),
			)
			privateURL.Use(Api.AuthenticateProtector(fmt.Sprintf("https://%v.com", domainName)))
			// privateURL.Use(Api.AuthenticateProtector("http://localhost:3000"))
			privateURL.Options("/", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Options("/login", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Options("/signup", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Options("/logcallback", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Options("/linkedin/callback", func(w http.ResponseWriter, r *http.Request) {})

			privateURL.Handle("/", playground.Handler("GraphQL playground", "/Search"))
			privateURL.Post("/login", DBinfo.LoginHandler)
			privateURL.Post("/signup", DBinfo.SignupHandler)
			privateURL.Get("/callback", DBinfo.GoogleCallbackHandler)
			privateURL.Handle("/Search", gqlHandler)
			privateURL.Get("/linkedin/callback", DBinfo.LinkedInCallbackHandler)

		},
	)

	// main routes

	log.Println("Backend Server is running on port", server.Addr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server failed: %v", err)
	}
}
