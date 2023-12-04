  import React, { useEffect, useState } from 'react'
  import NavBar from '../components/navbar';
  import Footer from '../components/footer';
  import '../styles/wishList.css'
  import ShopAboutUsFooter from '../components/shopAboutUsFooter';
import { Link } from 'react-router-dom';

  interface Wishlist{
    wishlistID: number;
    wishlistName: string;
    userID: number;
    wishlist: number;
    notes: string; 
  }

  interface WishlistDetail{
    wishlistID:number;
    productID: number;
    quantity: number;
    addedAt: string;
  }
  interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    shipping: number;
    category: string;
    imageURL: string;
  }


  const WishList = () => {
      const [searchResults, setSearchResults] = useState([]);
      const [userWishLists, setUserWishLists] = useState<Wishlist[]>([]);
      const [userID,setUserID] = useState('');
      const [wishlistsIDs,setWishlistsIDs] = useState<WishlistDetail[]>([]);
      const [wishlistProductsMap, setWishlistProductsMap] = useState<{ [key: number]: number[] }>({});
      const [productDetails, setProductDetails] = useState<any[]>([]);
      const calculateTotalPrice = (products: Product[]) => {
        return products.reduce((total, product) => total + product.price, 0);
      };
    
      useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('userID');
        if(!isUserLoggedIn){
          setUserID('');
        }else{
          const storedUserID = localStorage.getItem('userID');
          setUserID(storedUserID || '');
          // console.log(localStorage.getItem('userID'))  
      }
      }, []);
      useEffect(() => {
        fetch(`http://localhost:4000/api/user/wishlist/${userID}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log('Received data:', data);
            setUserWishLists(data);
            const wishlistIDs = data.map((wishlist:any) => wishlist.wishlistID);
            setWishlistsIDs(wishlistIDs);
            // console.log("wishlistids",wishlistIDs)
          })
          .catch((error) => console.error('Error fetching wishlist', error));
      }, [userID]);

      useEffect(() => {
        const fetchWishlistDetails = async (wishlistID: any) => {
          try {
            const response = await fetch(`http://localhost:4000/api/wishlist/detail/list/${wishlistID}`);
            if (!response.ok) {
              throw new Error(`Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`Received data for wishlistID ${wishlistID}:`, data);
            setWishlistProductsMap((prevMap) => ({
              ...prevMap,
              [wishlistID]: data.map((product: any) => product.productId),
            }));
          } catch (error) {
            console.error(`Error fetching wishlist details for wishlistID ${wishlistID}`, error);
          }
        };
      const fetchProductDetails = async (wishlistID: number) => {
      try {
        const response = await fetch(`http://localhost:4000/api/wishlist/detail/list/product/${wishlistID}`);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Received product details for wishlistID ${wishlistID}:`, data);
        setProductDetails((prevDetails) => [...prevDetails, { wishlistID, products: data }]);
        console.log("product",productDetails)
      } catch (error) {
        console.error(`Error fetching product details for wishlistID ${wishlistID}`, error);
      }
    };
        wishlistsIDs.forEach((wishlistID: any) => {
          fetchWishlistDetails(wishlistID);
          fetchProductDetails(wishlistID);
        });
      }, [wishlistsIDs]);
      
      
      return (
      <>
      <nav>
          <NavBar searchResults={searchResults} setSearchResults={setSearchResults}/>
      </nav>
      <div className='wishlist-header'>

        <div className='wishlist-header-left'>
          Home - Singapore &gt; <b>WishList</b>
        </div>
        <div className='wishlist-header-under'>
          <div className='wishlist-header-title'>
            WishList
          </div>
          <div className="wishlist-navbar">
            <ul className='wishlist-navbar-ul'>
            <li className="wishlist-navbar-list"><b><Link to={'/wishlist'} className='public-link'>My Lists</Link></b></li>
              <li className="wishlist-navbar-list"><Link to={'/wishlistFollow'} className='public-link'>Followed Lists</Link></li>
              <li className="wishlist-navbar-list"><Link to={'/wishlistPublic'} className='public-link'>Public Lists</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='wishlist-container'>
      <div className='wishlist-button-container'>
            <div>
              <button><b>CREATE A LIST</b></button>
            </div>
            <div>
            <button><b>MANAGE LIST</b></button>
            </div>
      </div>
      <div className='wishlist-detail-container'>
        <ul className='wishlist-user-container-list'>
          {userWishLists.map((wishlist: Wishlist) => {
            const wishlistDetails = productDetails.find((detail: any) => detail.wishlistID === wishlist.wishlistID);

            if (wishlistDetails) {
              const totalWishlistPrice = calculateTotalPrice(wishlistDetails.products);

              return (
                <li className='wishlist-list' key={wishlist.wishlistID}>
                  <div className='new-wish-list-text'>
                    <b> {wishlist.wishlistName}</b>
                  </div>
                  <div className='wishlist-item-container'>
                    <ul className='product-wishlist-list'>
                      {wishlistDetails.products.map((product: Product) => (
                        <li key={product.id}>
                          <div className='product-image'>
                            <img src={product.imageURL} alt={product.name} />
                          </div>
                          <div className='product-name'>{product.name}</div>
                        </li>
                      ))}
                    </ul>
                    <div className='wishlist-quantity-and-price'>
                      <div>
                        {productDetails.find((details) => details.wishlistID === wishlist.wishlistID)?.products.length || 0} items
                      </div>
                      <div>
                        <b>Total Price: ${totalWishlistPrice.toFixed(1)}</b>
                      </div>
                      <div>
                        <Link to={`/wishlist/${wishlist.wishlistID}`}className='view-wishlist-link'>
                        View Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
      </div>
      <div>
        <ShopAboutUsFooter/>
      </div>
      <footer>
          <Footer/>
      </footer>
      </>
    )
  }

  export default WishList