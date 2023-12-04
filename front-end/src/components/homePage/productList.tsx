import React, { useState, useEffect } from 'react';
import '../../styles/homePage/productList.css'
import { Link, useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  shipping: number;
  category: string;
  imageURL:string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
    <div>
      <div className='product-list-container'>
      <ul>
        {products.map((product) => (
          <div className='product-container'>
          <Link to={`/products/${product.id}`} className='link-product-detail'>
          <li key={product.id}>
            <div><img src={product.imageURL} alt="product" className='product-image'/></div>
            <div className='product-name'>{product.name}</div>
            <div className='product-rating'>Rating: {product.rating}</div>
            <div className='product-price'>${product.price}</div>
            <div className='product-shipping'>Shipping: {product.shipping}</div>
            <div className='product-category'>{product.category}</div>
          </li>
          </Link>
          </div>
        ))}
      </ul>
      </div>
    </div>
  );
};
export default ProductList;


