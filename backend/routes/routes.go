package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/jeremydwayne/safer-pilot/handlers"
)

func Setup(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/register", handlers.Register)
	api.Post("/login", handlers.Login)
	api.Get("/user", handlers.User)
	api.Post("/logout", handlers.Logout)
}
