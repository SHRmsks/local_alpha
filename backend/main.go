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

func heartbeats(pool *pgxpool.Pool, ctx context.Context, redisclient *redis.Client) {
	timeout := time.NewTicker(10 * time.Minute)
	log.Println("called heartbeats")
	contxt, cancel := context.WithTimeout(ctx, time.Duration(10*time.Second))
	defer cancel()
	defer timeout.Stop()
	_, err := pool.Query(contxt, "SELECT 1")
	if err != nil {
		log.Fatalln("Database down, ", err)
		return
	}
	err1 := redisclient.Ping(contxt).Err()
	if err1 != nil {
		log.Fatalln("Redis down, ", err)
		return
	}
	for range timeout.C {
		select {
		case <-ctx.Done():
			log.Println("shutting down gracefully")
			return
		default:
			newCxt, cancel1 := context.WithTimeout(ctx, time.Duration(10*time.Second))
			defer cancel1()
			_, err := pool.Query(newCxt, "SELECT 1")
			err1 := redisclient.Ping(newCxt).Err()
			if err != nil || err1 != nil {
				log.Fatalln("Database down, ", err, err1)
				return
			} else {
				log.Println("sending Heartbeats successfully", timeout.C)
			}

		}

	}
}
func main() {
	//main func context gloabl
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	// load configuration
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Println("Environment variables loaded successfully")

	port := os.Getenv("PORT")                   // backend port
	apiPort := os.Getenv("apiPORT")             // prod backend port
	frontEND_PORT := os.Getenv("FRONTEND_PORT") // local frontend
	// log.Println("frontend port: ", frontEND_PORT)
	domainName := os.Getenv("DomainName")                     // main domain
	Mongodb := os.Getenv("DBURL")                             //mongo db url
	PSQLURL := os.Getenv("PSQLURL")                           // psql url
	redisAddr := os.Getenv("redisAddr")                       // redis url
	googleClientSecret := os.Getenv("googleClientSecret")     // google oauth secret
	linkedinClientSecret := os.Getenv("linkedinClientSecret") // linkedin oauth

	/************************************************************************/
	/*backend Server*/
	r := chi.NewRouter()
	server := &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}
	var mongoClient *mongo.Client
	var pgPool *pgxpool.Pool
	var rdb *redis.Client
	var wg sync.WaitGroup
	wg.Add(3)
	timeout := time.Duration(30 * time.Second)
	errorChan := make(chan error, 3)
	done := make(chan struct{})
	go func() {
		defer wg.Done()
		contxt, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()
		opt, err := redis.ParseURL(redisAddr)
		if err != nil {
			errorChan <- err
		}
		rdb = redis.NewClient(opt)
		if err1 := rdb.Ping(contxt).Err(); err1 != nil {
			errorChan <- err1
		}
	}() // redis go routinue initialized

	go func() {
		defer wg.Done()

		contxt, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel() // Ensure context is canceled after use

		client, errMongo := mongo.Connect(contxt, options.Client().ApplyURI(Mongodb))
		if errMongo != nil {
			log.Printf("Error connecting to Mongodb: %v", err)
			return
		}
		mongoClient = client
		return
	}() // mongodb initialized

	go func() {
		defer wg.Done()
		contxt, cancel := context.WithTimeout(context.Background(), 30*time.Second)
		defer cancel()
		config, _ := pgxpool.ParseConfig(PSQLURL)
		config.ConnConfig.DialFunc = (&net.Dialer{
			LocalAddr: &net.TCPAddr{IP: net.IPv4zero},
			KeepAlive: 30 * time.Second,
			DualStack: false,
		}).DialContext
		conn, err := pgxpool.NewWithConfig(contxt, config)
		if err != nil {
			errorChan <- err
		}
		pgPool = conn
		return
	}() // initialize psql db
	go func() {
		for err := range errorChan {
			log.Fatalln("error on initializing services", err)
		}
	}()

	go func() {
		for {
			select {
			case <-time.After(timeout):
				log.Fatal("connection to db timed out")
			case <-ctx.Done():
				return
			case <-done:
				log.Println("database connected sucessfully")
				go heartbeats(pgPool, ctx, rdb)
				return
			}

		}

	}()

	wg.Wait()
	close(done)
	close(errorChan)
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
