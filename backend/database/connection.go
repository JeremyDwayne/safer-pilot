package database

import (
	"log"
	"os"

	"github.com/jeremydwayne/safer-pilot/types"
	"github.com/joho/godotenv"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	godotenv.Load()
	connection, err := gorm.Open(mysql.Open(os.Getenv("DSN")), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect to PlanetScale: %v", err)
	}

	DB = connection
	connection.AutoMigrate(&types.User{})
}
