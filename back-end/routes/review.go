package routes

import (
	"github.com/gavindloka/oldegg-backend/models"
	"github.com/gavindloka/oldegg-backend/storage"
	"github.com/kataras/iris/v12"
)

func GetReview(ctx iris.Context) {
	var reviews []models.Review
	storage.DB.Find(&reviews)
	ctx.JSON(reviews)
}
func CreateReview(ctx iris.Context) {
	var newReview models.Review
	if err := ctx.ReadJSON(&newReview); err != nil {
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Failed to parse"})
		return
	}

	result := storage.DB.Create(&newReview)
	if result.Error != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.JSON(iris.Map{"error": "Failed to insert"})
		return
	}
	ctx.JSON(newReview)
}
