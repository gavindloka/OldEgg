package storage

import (
	"log"
	"os"

	"github.com/gavindloka/oldegg-backend/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func connecToDB() *gorm.DB {
	err := godotenv.Load()
	if err != nil {
		panic("error loading .env file")
	}

	dsn := os.Getenv("DB_CONNECTION_STRING")
	db, dbError := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if dbError != nil {
		log.Panic("error connect to db")
	}
	DB = db
	return db
}
func performMigrations(db *gorm.DB) {
	db.AutoMigrate(
		&models.User{},
		&models.Product{},
		&models.Shop{},
		&models.Review{},
		&models.WishListHeader{},
		&models.WishListDetail{},
		&models.Cart{},
	)
}
func InitializeDB() *gorm.DB {
	db := connecToDB()
	performMigrations(db)
	return db
}
