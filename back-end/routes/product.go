package routes

import (
	"github.com/gavindloka/oldegg-backend/models"
	"github.com/gavindloka/oldegg-backend/storage"
	"github.com/kataras/iris/v12"
)

func GetProducts(ctx iris.Context) {
	var products []models.Product
	storage.DB.Find(&products)
	ctx.JSON(products)
}
func CreateProduct(ctx iris.Context) {
	var newProduct models.Product
	if err := ctx.ReadJSON(&newProduct); err != nil {
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Failed to parse"})
		return
	}

	result := storage.DB.Create(&newProduct)
	if result.Error != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.JSON(iris.Map{"error": "Failed to insert"})
		return
	}
	ctx.JSON(newProduct)
}

func GetProductByID(ctx iris.Context) {
	productID, err := ctx.Params().GetInt("id")
	if err != nil {
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Invalid product ID"})
		return
	}

	var product models.Product
	result := storage.DB.First(&product, productID)
	if result.Error != nil {
		ctx.StatusCode(iris.StatusNotFound)
		ctx.JSON(iris.Map{"error": "Product not found"})
		return
	}

	ctx.JSON(product)
}

