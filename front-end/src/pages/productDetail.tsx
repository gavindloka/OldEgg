import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/productDetail.css'
import NavBar from '../components/navbar';
import Footer from '../components/footer';

interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    shipping: number;
    category: string;
    imageURL: string;
  }

const ProductDetail = () => {
  const {id} = useParams<{id: string}>();
  const [product,setProduct] = useState<Product | null>(null)
  const [searchResults, setSearchResults] = useState([]);
  const userID = localStorage.getItem('userID');
  const userIDAsInt = userID !== null ? parseInt(userID, 10) : null;
  useEffect(() => {
    fetch(`http://localhost:4000/api/product/list/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Received product details:', data);
        setProduct(data);
      })
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);
  const handleAddToCart = async (productID: number | undefined) => {
    if (productID === undefined) {
      console.error('undefined!');
      return;
    }
  
    console.log('Adding to cart:', { userIDAsInt, productID });
  
    try {
      const response = await fetch("http://localhost:4000/api/cart/insert", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
    } catch (error) {
      console.error("Error adding product to cart: ", error)
    }
  }
  
  return (
    <>
    <nav>
        <NavBar searchResults={searchResults} setSearchResults={setSearchResults}/>
    </nav>
    <div className='item-detail-container'>
        <div className='item-photo'>
            <img src={product?.imageURL} alt="photoitem" />
        </div>
        <div className='name-rating-container'>
            <div className='product-detail-name'>
                {product?.name}
            </div>
            <div className='item-detail-detail'>
            <div className='item-detail-rating'>
                <div className='item-rating-text'>
                Rating: {product?.rating}
                </div>
                <div className='write-a-review'>
                 <a href="">Write a Review</a>
                </div>
            </div>
            <div>
                In Stock. Limit 2 per Customer
            </div>
            <div>
                <i>Ships from United States</i>
            </div>
            </div>
        </div>
        <div className='item-price-container'>
            <div className='price-detail'>
                <div>
                Estimated GST Inclusive
                </div>
                <div className='item-price'> 
                ${product?.price}
                </div>
            </div>
            <div className='addtocart'>
                <div>
                <select id="mySpinner" className='spinner'>
                    <option value="option1">1</option>
                    <option value="option2">2</option>
                    <option value="option3">3</option>
                    <option value="option1">4</option>
                    <option value="option2">5</option>
                    <option value="option3">6</option>
                    <option value="option1">7</option>
                    <option value="option2">8</option>
                    <option value="option3">9</option>
                    <option value="option1">10</option>
                </select>
                </div>
                <div>
                <button onClick={()=>handleAddToCart(product?.id)}>Add to cart &gt;</button>
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

export default ProductDetail