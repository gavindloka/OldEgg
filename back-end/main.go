package main

import (
	"os"

	"github.com/gavindloka/oldegg-backend/routes"
	"github.com/gavindloka/oldegg-backend/storage"
	"github.com/gavindloka/oldegg-backend/utils"
	"github.com/go-playground/validator/v10"
	"github.com/joho/godotenv"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/jwt"
)

func main() {
	godotenv.Load()
	storage.InitializeDB()
	app := iris.Default()
	app.Validator = validator.New()

	// corsMiddleware := cors.New(cors.Options{
	// 	AllowedOrigins:   []string{"*"}, 
	// 	AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
	// 	AllowCredentials: true,
	// })
	// app.Use(corsMiddleware)
	resetTokenVerifier := jwt.NewVerifier(jwt.HS256, []byte(os.Getenv("EMAIL_TOKEN_SECRET")))
	resetTokenVerifier.WithDefaultBlocklist()
	resetTokenVerifierMiddleware := resetTokenVerifier.Verify(func() interface{} {
		return new(utils.ForgotPasswordToken)
	})

	user := app.Party("/api/user")
	{
		user.Post("/register", routes.Register)
		user.Post("/login", routes.Login)
		user.Post("/signInAssist", routes.ForgotPassword)
		user.Post("/resetPassword", resetTokenVerifierMiddleware, routes.ResetPassword)
		user.Get("/list/{id:int}", routes.GetUserByID)
		user.Get("/wishlist/{id:int}", routes.GetUserWishLists)
		user.Get("/list", routes.GetAllUser)
	}
	wishlist := app.Party("/api/wishlist")
	{
		wishlist.Post("/create", routes.CreateWishListHeader)
		wishlist.Post("/createDetail", routes.CreateWishListDetail)
		wishlist.Get("/header/list", routes.GetAllWishListHeaders)
		wishlist.Get("/header/list/{id:int}", routes.GetWishListHeaderByID)
		wishlist.Get("/detail/list", routes.GetAllWishListDetails)
		wishlist.Get("/detail/list/{id:int}", routes.GetWishListDetailsByID)
		wishlist.Get("/detail/list/product/{id:int}", routes.GetProductsByWishlistID)
		wishlist.Get("/publicWishlist", routes.GetPublicWishLists)
	}
	product := app.Party("/api/product")
	{
		product.Get("/list", routes.GetProducts)
		product.Post("/create", routes.CreateProduct)
		product.Get("/list/{id:int}", routes.GetProductByID)
	}

	shop := app.Party("/api/shop")
	{
		shop.Get("/shopDetail", routes.GetShop)
		shop.Post("/create", routes.CreateShop)
	}
	review := app.Party("/api/review")
	{
		review.Get("/reviewDetail", routes.GetReview)
		review.Post("/create", routes.CreateReview)
	}
	cart := app.Party("/api/cart")
	{
		cart.Get("/list", routes.GetCarts)
		cart.Post("/insert", routes.InsertProductToCart)
		cart.Get("/list/{cart_id:int}/cart", routes.GetProductsByCartID)
		cart.Get("/list/{user_id:int}/user", routes.GetCartsAndProductsByUserID)
		cart.Delete("/delete/{cart_id:int}", routes.RemoveCart)
		cart.Delete("/deleteAllCart", routes.RemoveAllCarts)
	}
	app.Listen(":4000")
}
