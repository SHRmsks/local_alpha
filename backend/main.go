package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/lpernett/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"iperuranium.com/backend/Main/Api"
)

func main() {
	// load configuration
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	log.Println("Environment variables loaded successfully")
	port := os.Getenv("PORT")

	db := os.Getenv("DBURL")
	r := chi.NewRouter()
	server := &http.Server{
		Addr:    port,
		Handler: r,
	}
	// Initialize database
	contxt, cancel := context.WithTimeout(context.Background(), 50*time.Second)
	if err != nil {
		log.Fatal("Error connecting to database")
	}
	defer cancel()
	client, err := mongo.Connect(contxt, options.Client().ApplyURI(db))
	if err != nil {
		log.Fatal("Error connecting to database")
	}

	// Initialize routes

	r.Use(middleware.Logger)
	// main routes
	r.Use(Api.MiddleWare(client.Database("User")))

	r.Post("/login", Api.LoginHandler)

	log.Println("Server is running on port", port)

	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Server failed: %v", err)
	}
}
