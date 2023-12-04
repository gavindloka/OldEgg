package routes

import (
	"strings"

	"github.com/gavindloka/oldegg-backend/models"
	"github.com/gavindloka/oldegg-backend/storage"
	"github.com/gavindloka/oldegg-backend/utils"
	"github.com/kataras/iris/v12"
	jsonWT "github.com/kataras/iris/v12/middleware/jwt"
	"golang.org/x/crypto/bcrypt"
)

func Register(ctx iris.Context) {
	var userInput RegisterUserInput
	err := ctx.ReadJSON(&userInput)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}
	var newUser models.User
	userExists, userExistsErr := checkEmailExists(&newUser, userInput.Email)

	if userExistsErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	if userExists == true {
		utils.CreateEmailAlreadyRegistered(ctx)
		return
	}
	hashedPassword, hashErr := hashPassword(userInput.Password)
	if hashErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	newUser = models.User{
		FirstName: userInput.FirstName,
		LastName:  userInput.LastName,
		Email:     strings.ToLower(userInput.Email),
		Phone:     userInput.Phone,
		Password:  hashedPassword,
	}
	storage.DB.Create(&newUser)
	ctx.JSON(iris.Map{
		"ID":        newUser.ID,
		"firstName": newUser.FirstName,
		"lastName":  newUser.LastName,
		"email":     newUser.Email,
		"phone":     newUser.Phone,
	})
}

func Login(ctx iris.Context) {
	var userInput LoginUserInput
	err := ctx.ReadJSON(&userInput)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}
	var existingUser models.User
	errorMsg := "invalid email or password"
	userExists, userExistsErr := checkEmailExists(&existingUser, userInput.Email)
	if userExistsErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	if userExists == false {
		utils.CreateError(iris.StatusUnauthorized, "Credentials error", errorMsg, ctx)
		return
	}
	passwordErr := bcrypt.CompareHashAndPassword([]byte(existingUser.Password), []byte(userInput.Password))
	if passwordErr != nil {
		utils.CreateError(iris.StatusUnauthorized, "Credentials error", errorMsg, ctx)
		return
	}
	ctx.JSON(iris.Map{
		"ID":        existingUser.ID,
		"firstName": existingUser.FirstName,
		"lastName":  existingUser.LastName,
		"email":     existingUser.Email,
		"phone":     existingUser.Phone,
		"password":  existingUser.Password,
	})

}

func hashPassword(password string) (hashedPassword string, err error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}
func checkEmailExists(user *models.User, email string) (exist bool, err error) {
	userExistsQuery := storage.DB.Where("email=?", strings.ToLower(email)).Limit(1).Find(&user)
	if userExistsQuery.Error != nil {
		return false, userExistsQuery.Error
	}
	userExists := userExistsQuery.RowsAffected > 0
	if userExists == true {
		return true, nil
	}
	return false, nil
}

func ForgotPassword(ctx iris.Context) {
	var emailInput EmailRegisteredInput
	err := ctx.ReadJSON(&emailInput)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}

	var user models.User
	userExists, userExistsErr := checkEmailExists(&user, emailInput.Email)
	if userExistsErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	if !userExists {
		utils.CreateError(iris.StatusUnauthorized, "Credentials error", "invalid email", ctx)
		return
	}
	if userExists {
		baseURL := "http://localhost:3000"
		link := baseURL + "/resetPassword/"
		token, tokenErr := utils.CreateForgotPasswordToken(uint(user.ID), user.Email)
		if tokenErr != nil {
			utils.CreateInternalServerError(ctx)
			return
		}
		link += token
		subject := "Forgot Your Password?"
		html := `
		<p>
		It looks like you forgot your password.
		If you did, please check the link below to reset it.
		If you did not, ignore this message. 
		This link is valid for only 5 minutes.
		<br />
		<a href=` + link + `>Click to reset Password</a>
		</p><br />
		`

		emailSent, emailSentErr := utils.SendMail(user.Email, subject, html)

		if emailSentErr != nil {
			utils.CreateInternalServerError(ctx)
			return
		}
		if emailSent {
			ctx.JSON(iris.Map{
				"emailSent": true,
			})
			return
		}
		ctx.JSON(iris.Map{"emailSent": false})

	}
}

func ResetPassword(ctx iris.Context) {
	var password ResetPasswordInput
	err := ctx.ReadJSON(&password)
	if err != nil {
		utils.HandleValidationErrors(err, ctx)
		return
	}
	hashedPassword, hashErr := hashPassword(password.Password)
	if hashErr != nil {
		utils.CreateInternalServerError(ctx)
		return
	}
	claims := jsonWT.Get(ctx).(*utils.ForgotPasswordToken)

	var user models.User
	storage.DB.Model(&user).Where("id = ?", claims.ID).Update("password", hashedPassword)

}

func GetAllUser(ctx iris.Context){
	var user []models.User
	result:= storage.DB.Find(&user)
	if result.Error != nil {
		utils.CreateInternalServerError(ctx)
		return
	}

	ctx.JSON(user)
}

func GetUserByID(ctx iris.Context) {
	userID, err := ctx.Params().GetInt("id")
	if err != nil {
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{"error": "Invalid user ID"})
		return
	}

	var user models.User
	result := storage.DB.First(&user, userID)
	if result.Error != nil {
		ctx.StatusCode(iris.StatusNotFound)
		ctx.JSON(iris.Map{"error": "User not found"})
		return
	}
	ctx.JSON(user)
}

func GetUserWishLists(ctx iris.Context) {
	userID, err := ctx.Params().GetInt("id")
    if err != nil {
        ctx.StatusCode(iris.StatusBadRequest)
        ctx.JSON(iris.Map{"error": "Invalid user ID"})
        return
    }

    var wishLists []models.WishListHeader
    result := storage.DB.Where("user_id = ?", userID).Find(&wishLists)
    if result.Error != nil {
        ctx.StatusCode(iris.StatusNotFound)
        ctx.JSON(iris.Map{"error": "User not found or no wishlist"})
        return
    }

    ctx.JSON(wishLists)
}




type RegisterUserInput struct {
	FirstName string `json:"firstName" validate:"required,max=50"`
	LastName  string `json:"lastName" validate:"required,max=50"`
	Email     string `json:"email" validate:"required,max=50"`
	Phone     string `json:"phone" validate:"min=10,max=13"`
	Password  string `json:"password" validate:"required,min=8,max=30"`
}

type LoginUserInput struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

type EmailRegisteredInput struct {
	Email string `json:"email" validate:"required"`
}

type ResetPasswordInput struct {
	Password string `json:"password" validate:"required, min=8,max=30"`
}
