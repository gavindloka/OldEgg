import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import '../styles/shopHomePage.css'
import storage from '../assets/storage.png'
import headset from '../assets/headset.png'
import keyboard from '../assets/keyboard.png'
import processor from '../assets/amdryzen.png'
import mouse from '../assets/mouse.png'
import monitor from '../assets/monitor.png'
import graphics from '../assets/graphics-card.png'
import ShopHeader from '../components/shopHeader'

import { Link } from 'react-router-dom';

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
const ShopHomePage = () => {
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
        <NavBar  searchResults={searchResults} setSearchResults={setSearchResults}/>
    </nav>
    <div>
      <ShopHeader/>
    </div>  
    <div className='shop-banner'>
            <img src={shops?.bannerURL} alt="" />
    </div>
    <div className='shop-by-category  '>
      SHOP BY CATEGORY
    </div>
    <div className='shop-category-list-container'>
      <ul>
        <li className='shop-category-list'>
        <Link to="/shopProduct?category=Headset" className='category-link'>
          <div>
            <div><img src={headset} alt="" className='shop-category-image'/>
            <div>
              Headset
            </div>
            </div>
          </div>
          </Link>
        </li>
        <li className='shop-category-list'>
        <Link to="/shopProduct?category=Storage" className='category-link'>
          <div>
            <div><img src={storage} alt="" className='shop-category-image'/>
            <div>
              Storage
            </div>
            </div>
          </div>
          </Link>
        </li>
        <li className='shop-category-list'>
        <Link to="/shopProduct?category=Graphics Card" className='category-link'>
          <div>
            <div><img src={graphics} alt="" className='shop-category-image'/>
            <div>
              Graphics Card
            </div>
            </div>
          </div>
          </Link>
        </li>
        <li className='shop-category-list'>
        <Link to="/shopProduct?category=Mouse" className='category-link'>
          <div>
            <div><img src={mouse} alt="" className='shop-category-image'/>
            <div>
              Mouse
            </div>
            </div>
          </div>
          </Link>
        </li>
        <li className='shop-category-list'>
        <Link to="/shopProduct?category=Keyboard" className='category-link'>
          <div>
            <div><img src={keyboard} alt="" className='shop-category-image'/>
            <div>
              Keyboard
            </div>
            </div>
          </div>
          </Link>
        </li>
        <li className='shop-category-list'>
        <Link to="/shopProduct?category=Processor" className='category-link'>
          <div>
            <div><img src={processor} alt="" className='shop-category-image'/>
            <div>
              Processor
            </div>
            </div>
          </div>
          </Link>
        </li>
        <li className='shop-category-list'>
        <Link to="/shopProduct?category=Monitor" className='category-link'>
          <div>
            <div><img src={monitor} alt="" className='shop-category-image'/>
            <div>
              Monitor
            </div>
            </div>
          </div>
          </Link>
        </li>     
      </ul>
    </div>
    <footer>
        <Footer/>
    </footer>
    </>
  )
}

export default ShopHomePage