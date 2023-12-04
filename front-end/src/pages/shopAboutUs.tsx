import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import ShopHeader from '../components/shopHeader';
import '../styles/shopAboutUs.css'
import ShopAboutUsFooter from '../components/shopAboutUsFooter';

interface Shop {
    id: number;
    name: string;
    sales: number;
    followers:number;
    ratings:number;
    onTimeDelivery:number;
    productAccuracy:number;
    serviceSatisfaction: number;
    aboutUs: string;
    logoURL: string;
    bannerURL:string;
  }
const ShopAboutUs = () => {
    const [searchResults, setSearchResults] = useState([]);
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
    <nav>
    <NavBar searchResults={searchResults} setSearchResults={setSearchResults}/>
    </nav>
    <div>
    <ShopHeader/>
    </div>
    <div className='about-us-container'>
    <h2 className='about-us-title'>ABOUT US</h2>
    <div className='shop-about-us-name'>
        {shops?.name}
    </div>
    <div className='shop-sales-container'>
        <span className='shop-about-us-sales'>{shops?.sales} </span>Sales
    </div>
    <div>
        {shops?.aboutUs}
    </div>
    <div>
      <ShopAboutUsFooter/>
    </div>
    </div>
    <footer>
    <Footer/>
    </footer>
    </>
  )
}

export default ShopAboutUs