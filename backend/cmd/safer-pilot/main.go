package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/jeremydwayne/safer-pilot/database"
	"github.com/jeremydwayne/safer-pilot/routes"
)

func main() {
	database.Connect()

	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	app.Use(recover.New())

	routes.Setup(app)

	app.Listen(":8000")
}
