	package models

	type User struct {
		ID        int    `json:"id"`
		FirstName string `json:"firstName"`
		LastName  string `json:"lastName"`
		Email     string `json:"email"`
		Phone     string `json:"phone"`
		Password  string `json:"password"`
	}
