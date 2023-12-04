package routes

import (
	"github.com/gavindloka/oldegg-backend/models"
	"github.com/gavindloka/oldegg-backend/storage"
	"github.com/gavindloka/oldegg-backend/utils"
	"github.com/kataras/iris/v12"
)

func InsertProductToCart(ctx iris.Context) {
	var newCart models.Cart
	if err := ctx.ReadJSON(&newCart); err != nil {
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Failed to parse"})
		return
	}

	result := storage.DB.Create(&newCart)
	if result.Error != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.JSON(iris.Map{"error": "Failed to insert"})
		return
	}
	ctx.JSON(newCart)
}
func RemoveCart(ctx iris.Context) {
	cartID, err := ctx.Params().GetInt("cart_id")
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}
	var existingCart models.Cart
	result := storage.DB.First(&existingCart, cartID)
	if result.Error != nil {
		utils.CreateError(iris.StatusNotFound, "Cart not found", "Cart doesn't exist", ctx)
		return
	}
	result = storage.DB.Delete(&existingCart, cartID)
	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	ctx.JSON(iris.Map{"message": "Cart removed!!!"})
}

func GetCarts(ctx iris.Context) {
	var carts []models.Cart
	storage.DB.Find(&carts)
	ctx.JSON(carts)
}

func GetProductsByCartID(ctx iris.Context) {
	cartID, err := ctx.Params().GetInt("cart_id")
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}
	var products []models.Product
	result := storage.DB.Table("carts").
		Select("products.*").
		Joins("JOIN products ON carts.product_id = products.id").
		Where("cart_id = ?", cartID).
		Find(&products)

	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if result.RowsAffected == 0 {
		utils.CreateError(iris.StatusNotFound, "Cart not found", "Cart doesn't exist", ctx)
		return
	}
	ctx.JSON(products)
}
func GetCartsAndProductsByUserID(ctx iris.Context) {
	userID, err := ctx.Params().GetInt("user_id")
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}
	var data []struct {
		models.Cart
		models.Product
	}
	result := storage.DB.Table("users").
		Select("carts.*,products.*").
		Joins("JOIN carts ON carts.user_id = users.id").
		Joins("JOIN products ON carts.product_id = products.id").
		Where("user_id = ?", userID).
		Find(&data)

	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if result.RowsAffected == 0 {
		utils.CreateError(iris.StatusNotFound, "Cart not found", "Cart doesn't exist", ctx)
		return
	}
	ctx.JSON(data)
}

func RemoveAllCarts(ctx iris.Context) {
    result := storage.DB.Exec("DELETE FROM carts")
    if result.Error != nil {
        utils.CreateInternalServerError(ctx)
        return
    }
    ctx.JSON(iris.Map{"message": "All carts removed!!!"})
}

