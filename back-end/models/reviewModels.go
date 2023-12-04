package models

import "time"

type Review struct {
	ID           int       `json:"id"`
	CustomerName string    `json:"customerName"`
	OrderedOn    time.Time `json:"orderedOn"`
	Rating       int       `json:"rating"`
	Description  string    `json:"description"`
}
