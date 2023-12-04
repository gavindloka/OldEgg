import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import ShopAboutUsFooter from '../components/shopAboutUsFooter';
import { Link, useParams } from 'react-router-dom';
import '../styles/wishListDetail.css'


interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  shipping: number;
  category: string;
  imageURL: string;
}

interface Wishlist {
    wishlistID: number;
    wishlistName: string;
    userID: number;
    wishlist: number;
    notes: string;
  }
  
interface WishlistDetail {
  wishlistID: number;
  productID: number;
  quantity: number;
  addedAt: string;
}

const WishListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchResults, setSearchResults] = useState([]);
  const [wishlistDetails, setWishlistDetails] = useState<WishlistDetail[]>([]);
  const [productDetails, setProductDetails] = useState<Product[]>([]);
  const [wishlistInfo, setWishlistInfo] = useState<Wishlist | null>(null);
  const userID = localStorage.getItem('userID');
  const userIDAsInt = userID !== null ? parseInt(userID, 10) : null;

  useEffect(() => {
    const fetchWishlistDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/wishlist/detail/list/${id}`);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Received wishlist details for wishlistID ${id}:`, data);
        setWishlistDetails(data);
        const productIDs = data.map((wishlistDetail:any) => wishlistDetail.productID);
        const productResponse = await fetch(`http://localhost:4000/api/wishlist/detail/list/product/${id}`);
        if (!productResponse.ok) {
          throw new Error(`Status: ${productResponse.status}`);
        }
        const productData = await productResponse.json();
        console.log(`Received product details for productIDs ${productIDs.join(',')}:`, productData);
        setProductDetails(productData);
      } catch (error) {
        console.error(`Error fetching wishlist details for wishlistID ${id}`, error);
      }
    };
    const fetchWishlistInfo = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/wishlist/header/list/${id}`);
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(`Received wishlist information for wishlistID ${id}:`, data);
          setWishlistInfo(data);
        } catch (error) {
          console.error(`Error fetching wishlist information for wishlistID ${id}`, error);
        }
      };
    fetchWishlistDetails();
    fetchWishlistInfo();
  }, [id]);

  const handleAddToCart = async (productID: number)=>{
    console.log('Adding to cart:', { userIDAsInt, productID });
    try{
      const response = await fetch("http://localhost:4000/api/cart/insert",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          userID: userIDAsInt,
          productID: productID,
          quantity: 1
        }),
      });
      if (response.ok) {
        console.log('Product added!!!');
      } else {
        console.error('Error adding product to cart!');
      }
    } catch(error){
      console.error("Error adding product to cart: ",error)
    }
  }
    
  return (
    <>
      <nav>
        <NavBar searchResults={searchResults} setSearchResults={setSearchResults} />
      </nav>
      <div className='wishlist-header'>
        <div className='wishlist-header-left'>
          Home - Singapore &gt; <b>{wishlistInfo?.wishlistName}</b>
        </div>
      </div>
      <div className='body-filter-filter-container'>
      <div className='wishlist-header-header-under'>
          <div className='wishlist-header-header-title'>
            <b className='wishlist-name-detail'>{wishlistInfo?.wishlistName}</b>
          </div>
          <div>
            BY Anonymous
          </div>
          <div className='follow-duplicate-btn'>
            <div>
                <button>FOLLOW</button>
            </div>
            <div>
                <button>DUPLICATE</button>
            </div>
          </div>
        </div>
      <div>
        <ul>
          {productDetails.map((product) => (
            <li key={product.id} className='product-detail-detail-list'>
              <div>
                <img src={product.imageURL} alt={product.name} className='product-image'/>
              </div>
              <div>
              <div>Rating: {product.rating}</div>
              <div><b>{product.name}</b></div>
              </div>
              <div>
              <div><b>Price: ${product.price}</b></div>
              <div>Shipping ${product.shipping}</div>
              <div><button className='add-to-cart' onClick={() => handleAddToCart(product.id)}><b>ADD TO CART &gt;</b></button></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
      <div>
        <ShopAboutUsFooter />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default WishListDetail;
