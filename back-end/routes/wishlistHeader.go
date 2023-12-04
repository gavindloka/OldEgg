// wishlistheader.go
package routes

import (
	"github.com/gavindloka/oldegg-backend/models"
	"github.com/gavindloka/oldegg-backend/storage"
	"github.com/gavindloka/oldegg-backend/utils"
	"github.com/kataras/iris/v12"
)

type CreateWishListHeaderInput struct {
	WishlistName   string `json:"wishlistName" validate:"required,max=50"`
	UserID         int    `json:"userID" validate:"required"`
	WishlistStatus string `json:"wishlistStatus"`
	Notes          string `json:"notes"`
}

func GetAllWishListHeaders(ctx iris.Context) {
	var wishlistHeaders []models.WishListHeader

	result := storage.DB.Find(&wishlistHeaders)
	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.JSON(wishlistHeaders)
}
func GetWishListHeaderByID(ctx iris.Context) {
	wishlistID, err := ctx.Params().GetInt("id")
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	var wishlistHeader models.WishListHeader
	result := storage.DB.Where("wishlist_id = ?", wishlistID).First(&wishlistHeader)
	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	if result.RowsAffected == 0 {
		utils.CreateError(iris.StatusNotFound, "Wishlist not found", "Wishlist does not exist", ctx)
		return
	}

	ctx.JSON(wishlistHeader)
}
func CreateWishListHeader(ctx iris.Context) {
	var input CreateWishListHeaderInput
	err := ctx.ReadJSON(&input)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}
	var user models.User
	userExists, userExistsErr := checkUserExists(&user, input.UserID)
	if userExistsErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	if !userExists {
		utils.CreateError(iris.StatusBadRequest, "User not found", "User does not exist", ctx)
		return
	}

	newWishListHeader := models.WishListHeader{
		Wishlistname:   input.WishlistName,
		UserID:         input.UserID,
		WishlistStatus: input.WishlistStatus,
		Notes:          input.Notes,
	}

	storage.DB.Create(&newWishListHeader)
	ctx.JSON(newWishListHeader)
}

func GetPublicWishLists(ctx iris.Context) {
    wishlistStatus := "Public"
    var wishlists []models.WishListHeader
    result := storage.DB.Where("wishlist_status = ?", wishlistStatus).Find(&wishlists)
    if result.Error != nil {
        utils.CreateInternalServerError(ctx)
        return
    }

    ctx.JSON(wishlists)
}

func checkUserExists(user *models.User, userID int) (exist bool, err error) {
	userExistsQuery := storage.DB.Where("id = ?", userID).Limit(1).Find(&user)
	if userExistsQuery.Error != nil {
		return false, userExistsQuery.Error
	}
	userExists := userExistsQuery.RowsAffected > 0
	return userExists, nil
}
