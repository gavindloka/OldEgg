import React, { useEffect, useState } from 'react'
import '../styles/shopHomePage.css'
import { useNavigate } from 'react-router-dom';
import ProductList from './homePage/productList';
interface Shop {
    id: number;
    name: string;
    sales: number;
    followers:number;
    ratings:number;
    onTimeDelivery:number;
    shopAccuracy:number;
    serviceSatisfactions: number;
    aboutUs: string;
    logoURL: string;
    bannerURL:string;
  }

const ShopHeader = () => {
    const navigate = useNavigate()
    const [shops, setShops] = useState<Shop | null>(null);
    useEffect(()=>{
      fetch('http://localhost:4000/api/shop/shopDetail')
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data:', data);
        const selectedShop = data.find((shop: Shop) => shop.id === 1);
        setShops(selectedShop);
      })
      .catch((error) => console.error('Error fetching shops:', error));
    },[])
  return (
    <>
     <div>
    {shops && (
            <>
            <div className='shop-header-container'>
              <div>
                <img src={shops.logoURL} alt='shop' className='shop-image' />
              </div>
              <div className='shop-detail'>
              <div className='shop-name'>{shops.name}</div>
              <div className='shop-attribute'>
                <div>
                {shops.sales} Sales
                </div>
              <div>
                {shops.followers} Followers
              </div>
              <div>
                {shops.ratings} Ratings
              </div>
              </div>
              <div className='shop-header-btn'>
                <div>
                <button className='f-btn'>FOLLOW</button>
                </div>
                <div>
                <button className='c-btn'>CONTACT</button>
                </div>
              </div>
              </div>
            </div>
            <div className='shop-menu-container'>
        <div className='shop-path'>
        Home - Singapore &gt; {shops?.name}
        </div>
        <div className='shop-menu-list-container'>
        <ul className='shop-menu-list'>
            <li className='shop-item' onClick={()=>navigate('/shopHome')}>Store Home</li>
            <li>|</li>
            <li className='shop-item' onClick={()=>navigate('/shopProduct')}>All Products</li>
            <li>|</li>
            <li className='shop-item' onClick={()=>navigate('/shopReview')}>Reviews</li>
            <li>|</li>
            <li className='shop-item'>Return Policy</li>
            <li>|</li>
            <li className='shop-item' onClick={()=>navigate('/shopAboutUs')}>About Us</li>
        </ul>
        </div>
        </div>
            </>
          )}
      </div>
    </>
    
  )
}

export default ShopHeader