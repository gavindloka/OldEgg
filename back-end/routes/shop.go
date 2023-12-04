package routes

import (
	"github.com/gavindloka/oldegg-backend/models"
	"github.com/gavindloka/oldegg-backend/storage"
	"github.com/kataras/iris/v12"
)

func GetShop(ctx iris.Context) {
	var shops []models.Shop
	storage.DB.Find(&shops)
	ctx.JSON(shops)
}
func CreateShop(ctx iris.Context) {
	var newShop models.Shop
	if err := ctx.ReadJSON(&newShop); err != nil {
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Failed to parse"})
		return
	}

	result := storage.DB.Create(&newShop)
	if result.Error != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.JSON(iris.Map{"error": "Failed to insert"})
		return
	}
	ctx.JSON(newShop)
}
