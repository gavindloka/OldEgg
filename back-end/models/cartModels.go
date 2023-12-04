package models

type Cart struct {
	CartID    int `json:"cartID" gorm:"primaryKey;autoIncrement"`
	UserID    int `json:"userID"`
	ProductID int `json:"productID"`
	Quantity  int `json:"quantity"`
}
