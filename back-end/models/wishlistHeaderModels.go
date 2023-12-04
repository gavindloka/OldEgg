package models

type WishListHeader struct {
	WishlistID     int    `json:"wishlistID" gorm:"primaryKey;autoIncrement"`
	Wishlistname   string `json:"wishlistName"`
	UserID         int    `json:"userID"`
	WishlistStatus string `json:"wishlistStatus"`
	Notes          string `json:"notes"`
}
