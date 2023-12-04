package models

type Product struct {
	ID       int     `json:"id"`
	Name     string  `json:"name"`
	Price    float64 `json:"price"`
	Rating   float64 `json:"rating"`
	Shipping float64 `json:"shipping"`
	Category string  `json:"category"`
	ImageURL string  `json:"imageURL"`
}
