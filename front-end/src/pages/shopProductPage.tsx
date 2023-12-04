import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import ShopHeader from '../components/shopHeader';
import '../styles/shopProduct.css'
import { Link, useLocation } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  shipping: number;
  category: string;
  imageURL: string;
}

const ShopProductPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategoryFromURL = queryParams.get('category');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(selectedCategoryFromURL);
  const [products, setProducts] = useState<Product[]>([]);
  const filterProducts = (products: Product[], category: string | null) => {
    if (!category) {
      return products;
    }

    return products.filter((product) => product.category === category);
  };

  const filteredProducts = filterProducts(products, selectedCategory);
  
  useEffect(() => {
    fetch('http://localhost:4000/api/product/list')
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data:', data);
        setProducts(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);
  return (
    <>
      <nav>
        <NavBar searchResults={searchResults} setSearchResults={setSearchResults} />
      </nav>
      <div>
        <ShopHeader />
      </div>
      <div className='shop-product-body'>
        <div className='shop-filter-and-list-container'>
    <div className='shop-product-filter-container'>
    <div className='filter-title'>
      Filter
    </div>
    <div className='category-list'>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category" 
      checked={selectedCategory === "Storage"}
      onChange={() => setSelectedCategory("Storage")}/>
      </div>
      <div> 
        Storage
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedCategory === "Graphics Card"}
      onChange={() => setSelectedCategory("Graphics Card")}/>
      </div>
      <div>
        Graphics Card
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedCategory === "Mouse"}
      onChange={() => setSelectedCategory("Mouse")}/>
      </div>
      <div>
        Mouse
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedCategory === "Keyboard"}
      onChange={() => setSelectedCategory("Keyboard")}/>
      </div>
      <div>
        Keyboard
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedCategory === "Processor"}
      onChange={() => setSelectedCategory("Processor")}/>
      </div>
      <div>
        Processor
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedCategory === "Monitor"}
      onChange={() => setSelectedCategory("Monitor")}/>
      </div>
      <div>
        Monitor
      </div>
    </div>
    <div className='filter'>
      <div>
      <input type="checkbox" name="category"
      checked={selectedCategory === "Headset"}
      onChange={() => setSelectedCategory("Headset")}/>
      </div>
      <div>
        Headset
      </div>
    </div>
    </div>
          </div>
          <div className='shop-product-list-container'>
            <ul className='shop-product-list'>
              {filteredProducts.map((product) => (
                <Link to={`/products/${product.id}`} className='shop-product-container'>
                <li key={product.id}>
                  <div>
                    <img src={product.imageURL} alt='product' className='shop-product-image' />
                  </div>
                  <div className='shop-product-name'>{product.name}</div>
                  <div className='shop-product-rating'>Rating: {product.rating}</div>
                  <div className='shop-product-price'>${product.price}</div>
                  <div className='shop-product-shipping'>Shipping: {product.shipping}</div>
                  <div className='shop-product-category'>{product.category}</div>
                </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default ShopProductPage;
