import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import '../styles/shoppingCart.css'
interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  shipping: number;
  category: string;
  imageURL: string;
}
interface Cart{
  cartID: number;
  userID: number;
  productID:number;
  quantity:number;
}

const ShoppingCart = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [cartData, setCartData] = useState([]);
  const userID = localStorage.getItem('userID');
  const calculateTotalItemPrice = () => {
    return cartData.reduce((total, item:any) => total + item.price, 0);
  };
  const handleRemoveCartItem = async (cartID:any) => {
    try {
      const response = await fetch(`http://localhost:4000/api/cart/delete/${cartID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("removed")
        window.location.reload();
      } else {
        console.error('Failed to remove cart');
      }
    } catch (error) {
      console.error('Error removing cart:', error);
    }
  };
  useEffect(() => {
    console.log(userID)
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/cart/list/${userID}/user`);
        if (response.ok) {
          const data = await response.json();
          setCartData(data);
        } else {
          console.error('Failed to fetch');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
    fetchData();
  }, [userID]);
  const handleRemoveAllCarts = async()=>{
    try{
      const response = await fetch("http://localhost:4000/api/cart/deleteAllCart", {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        console.log("All carts removed")
        window.location.reload();
      }else{
        console.log("error mas")
      }
    }catch (error){
      console.error("error bro: ",error)
    }
  }
  return (
    <>
    <nav className=''>
    <NavBar searchResults={searchResults} setSearchResults={setSearchResults} />
    </nav>
    <div className='shopping-cart-container'>
    <div className='shopping-cart-header'>
    <div className='cart-header-left'>
    <div className='shopping-cart-title'>
      <b>Shopping cart</b>
    </div>
    <div>
      1 item
    </div>
    </div>
    <div className='cart-header-right'>
    <div className='cart-item-right'>
      <button>
      MOVE ALL TO WISH LIST
      </button>
    </div>
    <div className='cart-item-right'>
      <button onClick={()=>handleRemoveAllCarts()}>
      REMOVE ALL
      </button>
    </div>
    </div>
    </div>
    <div className='cart-promo'>
      <div>
        <b>FREE SHIPPING... WELL ALMOST</b>
      </div>
      <div>
        Add $59.01 of eligille products and get free shipping
      </div>
    </div>
    <div className='image-cart-container'>
      <ul className='image-cart-ul'>
      {cartData.map((item: Cart & Product) => (
              <li key={item.cartID} className='cart-data'>
                <div className='cart-item'>
                  <div className='cart-item-image'>
                  <img src={item.imageURL} alt="product-photo" className='product-image'/>
                  </div>
                  <div className='product-name-button-container'>
                    <div className='product-name-cart'>
                      <b>Name: {item.name}</b>
                    </div>
                    <div className='wish-button-container'>
                      <div>
                        <button>MOVE TO WISH LIST</button>
                      </div>
                      <div>
                        <button>SAVE FOR LATER</button>
                      </div>
                    </div>
                    <div>
                      <div>
                        <b>Protection Plan Options</b>
                      </div>
                      <div>Add a protection plan, starting at $28.99</div>
                    </div>
                  </div>
                  <div className='limit-and-price-cart-container'>
                    <div className='limit-container'>
                      <div>
                        <input type="text" className='limit-input' />
                      </div>
                      <div className='limit'>Limit 1</div>
                    </div>
                    <div className='price-cart-container'>
                      <div>
                        <b>{item.price}</b>
                      </div>
                      <div className='over-text'>Over 10000 people have this item in their cart</div>
                      <div className='remove-button'>
                        <button onClick={() => handleRemoveCartItem(item.cartID)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      <div className='price-summary'>
        <div className='summary-title'>
          SUMMARY
        </div>
        <div>
        <div className='item-count'>
          <div>
            Item
          </div>
          <div className='price-cart'>
           $ {calculateTotalItemPrice()}
          </div>
        </div>
        <div className='delivery-est'>
          <div>
            Est. Delivery
          </div>
          <div className='price-cart'>
            ${calculateTotalItemPrice()*10/100}
          </div>
        </div>
        <div className='est-gst'>
          <div>
            Est gst
          </div>
          <div className='price-cart'>
          ${calculateTotalItemPrice()*10/100*10/100}
          </div>
        </div>
        </div>
        <div className='apply-promo'>
          <div>
            Apply Promo Code 
          </div>
          <div>
            +
          </div>
        </div>
        <div className='total-price-container'>
          <div>
            Est Total:
          </div>
          <div>
            <b>
            {(calculateTotalItemPrice())+(calculateTotalItemPrice()*10/100)+((calculateTotalItemPrice()*10/100*10/100))}
            </b>
          </div>
        </div>
        <div className='secure-checkout-container'>
          <button><b>SECURE CHECKOUT &gt;</b></button>
        </div>
        </div>
      </div>
      </div>
    <footer>
      <Footer/>
    </footer>
    </>
  )
}

export default ShoppingCart

