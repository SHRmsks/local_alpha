package main

import (
	"context"
	"fmt"

	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/cors"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/lpernett/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	Api "iperuranium.com/backend/Main/Api"
)

func main() {
	// load configuration
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Println("Environment variables loaded successfully")
	port := os.Getenv("PORT")

	frontEND_PORT := os.Getenv("FRONTEND_PORT")
	log.Println("frontend port: ", frontEND_PORT)
	domainName := os.Getenv("DomainName")
	if domainName == "" {
		domainName = ""
	}
	db := os.Getenv("DBURL")
	r := chi.NewRouter()
	server := &http.Server{
		Addr:    port,
		Handler: r,
	}

	// Initialize database
	contxt, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel() // Ensure context is canceled after use

	client, err := mongo.Connect(contxt, options.Client().ApplyURI(db))
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	// Initialize routes

	r.Use(middleware.Logger)
	// middleWare

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
			privateURL.Use(Api.AuthenticateProtector)
			privateURL.Use(Api.MiddleWareOAUTH)
			privateURL.Use(Api.MiddleWareLOGIN(client.Database("User")))

			privateURL.Options("/login", func(w http.ResponseWriter, r *http.Request) {

			})
			privateURL.Options("/logcallback", func(w http.ResponseWriter, r *http.Request) {

			})
			privateURL.Options("/linkedin/callback", func(w http.ResponseWriter, r *http.Request) {})
			privateURL.Post("/login", Api.LoginHandler)
			privateURL.Get("/callback", Api.CallbackHandler)
			privateURL.Get("/linkedin/callback", Api.LinkedInCallbackHandler)

		},
	)

	// main routes

	log.Println("Server is running on port", port)

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server failed: %v", err)
	}
}
