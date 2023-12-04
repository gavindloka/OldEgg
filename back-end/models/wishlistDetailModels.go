package models

import "time"

type WishListDetail struct {
	WishlistID int       `json:"wishlistId"`
	ProductID  int       `json:"productId"`
	Quantity   int       `json:"quantity"`
	AddedAt    time.Time `json:"addedAt"`
}
