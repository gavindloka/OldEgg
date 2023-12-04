package models

type Shop struct {
	ID                  int     `json:"id"`
	Name                string  `json:"name"`
	Sales               int     `json:"sales"`
	Followers           int     `json:"followers"`
	Ratings             float64 `json:"ratings"`
	OnTimeDelivery      float64 `json:"onTimeDelivery"`
	ProductAccuracy     float64 `json:"productAccuracy"`
	ServiceSatisfaction float64 `json:"serviceSatisfaction"`
	AboutUs             string  `json:"aboutUs"`
	LogoURL             string  `json:"logoURL"`
	BannerURL			string  `json:"bannerURL"`
}
