package routes

import (
	"time"

	"github.com/gavindloka/oldegg-backend/models"
	"github.com/gavindloka/oldegg-backend/storage"
	"github.com/gavindloka/oldegg-backend/utils"
	"github.com/kataras/iris/v12"
)

type CreateWishListDetailInput struct {
	WishlistID int `json:"wishlistId" validate:"required"`
	ProductID  int `json:"productId" validate:"required"`
	Quantity   int `json:"quantity" validate:"required"`
}

func GetAllWishListDetails(ctx iris.Context) {
	var wishlistDetail []models.WishListDetail

	result := storage.DB.Find(&wishlistDetail)
	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.JSON(wishlistDetail)
}
func GetWishListDetailsByID(ctx iris.Context) {
	wishlistID, err := ctx.Params().GetInt("id")
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	var wishlistDetails []models.WishListDetail
	result := storage.DB.Where("wishlist_id = ?", wishlistID).Find(&wishlistDetails)
	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if result.RowsAffected == 0 {
		utils.CreateError(iris.StatusNotFound, "Wishlist not found", "Wishlist does not exist", ctx)
		return
	}

	ctx.JSON(wishlistDetails)
}

func CreateWishListDetail(ctx iris.Context) {
	var input CreateWishListDetailInput
	if err := ctx.ReadJSON(&input); err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}
	wishlistExists, err := checkWishlistExists(input.WishlistID)
	if err != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	if !wishlistExists {
		utils.CreateError(iris.StatusBadRequest, "Wishlist not found", "Wishlist does not exist", ctx)
		return
	}
	productExists, err := checkProductExists(input.ProductID)
	if err != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	if !productExists {
		utils.CreateError(iris.StatusBadRequest, "Product not found", "Product does not exist", ctx)
		return
	}

	newWishListDetail := models.WishListDetail{
		WishlistID: input.WishlistID,
		ProductID:  input.ProductID,
		Quantity:   input.Quantity,
		AddedAt:    time.Now(),
	}

	if err := storage.DB.Create(&newWishListDetail).Error; err != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.JSON(newWishListDetail)
}

func GetProductsByWishlistID(ctx iris.Context) {
	wishlistID, err := ctx.Params().GetInt("id")
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	var products []models.Product
	result := storage.DB.Table("wish_list_details").
		Select("products.*").
		Joins("JOIN products ON wish_list_details.product_id = products.id").
		Where("wishlist_id = ?", wishlistID).
		Find(&products)
	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if result.RowsAffected == 0 {
		utils.CreateError(iris.StatusNotFound, "Wishlist not found", "Wishlist doesn't exist", ctx)
		return
	}

	ctx.JSON(products)
}

func checkWishlistExists(wishlistID int) (bool, error) {
	var wishlist models.WishListHeader
	result := storage.DB.Where("wishlist_id = ?", wishlistID).Limit(1).Find(&wishlist)
	if result.Error != nil {
		return false, result.Error
	}
	return result.RowsAffected > 0, nil
}

func checkProductExists(productID int) (bool, error) {
	var product models.Product
	result := storage.DB.Where("id = ?", productID).Limit(1).Find(&product)
	if result.Error != nil {
		return false, result.Error
	}
	return result.RowsAffected > 0, nil
}
