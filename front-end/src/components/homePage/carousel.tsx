import { useState, useEffect } from 'react';
import '../../styles/homePage/carousel.scss';
import right from '../../assets/right-arrow.png';
import left from '../../assets/left-arrow.png';
import cpu from '../../assets/cpu.png';
import headset from '../../assets/headset.png'
import keyboard from '../../assets/keyboard.png'
import ryzen from '../../assets/ryzen.jpg'
import cooler from '../../assets/cooler.png'
import { carouselData } from '../../data/homePage/carouselData';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = carouselData.length;
  const [username, setUsername] = useState('');
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setCurrentSlide(0);
    const isUserLoggedIn = localStorage.getItem('userID');
    if(!isUserLoggedIn){
        setUsername('GUEST');
    }else{
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || '');
    }

  }, []);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 3000);
    return () => clearInterval(intervalId);
  }, [currentSlide]);

  return (
    <>
    <div className="carousel-container">
      <div className="menu-list-container">
      <ul className='menu-list'>
        <li className='menu-list-item'>
          Components & Storage
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Computer Systems
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Computer Peripherals
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Electronics
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Gaming
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Software & Services
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Networking
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Office Solutions
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Automotive & Industrial
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Home & Tools
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Health & Sports
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Apparel & Accessories
          <img src={right} alt="" />
        </li>
        <li className='menu-list-item'>
          Toys, Drones & maker
          <img src={right} alt="" />
        </li>
        </ul>
      </div>
      <div>
      <div className="carousel">
        <img src={right} alt="right" className="right-arrow" onClick={nextSlide} />
        <img src={left} alt="left" className="left-arrow" onClick={prevSlide} />
        {carouselData.map((slide, index) => {
          return (
            <div className={index === currentSlide ? 'slide current' : 'slide'} key={index}>
              {index === currentSlide && (
                <div>
                  <img src={slide.image} alt="slide" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div>
      <div className='box-container'>
        <div className='box-item'>
          <div className='box-title'>
            HI, {username.toUpperCase()}
          </div>
          <div className='box-one-description'>
            Welcome to Newegg! Hope you enjoy shopping here today. 
            If you have any comment or suggestion, please leave us <a href="">feedback</a>
          </div>
          <div className='box-link-container'>
            <div>
              <a href="" className='box-link'>YOUR ACCOUNT</a>
            </div>
            <div>
              <a href="" className='box-link'>YOUR ORDERS</a>
            </div>
          </div>
        </div>
        <div className='box-item'>
          <div className='box-header-see-more'>
          <div className='box-title'>
            RECENTLY VIEWED ITEMS
          </div>
          <div>
            <a href="" className='see-more'>See More</a>
          </div>
          </div>
          <img src={cpu} alt="cpu" />
          <img src={headset} alt="headset" />
        </div>
        <div className='box-item'>
        <div className='box-three-container'>
          <div className='box-title'>
            RECOMMENDED CATEGORIES
          </div>
          <div className='box-item-three'>
          <div className='box-item-item'>
            <img src={cooler} alt="cooler"/>
          </div>
          <div className='box-item-item'>
            <img src={ryzen} alt="ryzen" />
          </div>
          <div className='box-item-item'>
            <img src={keyboard} alt="keyboard" />
          </div>
          </div>
          <div className='item-name-container'>
            <ul>
              <div className='cooler'>
              <li>Cooler Fan</li>
              </div>
              <div className='ryzen'>
              <li>Processors</li>
              </div>
              <div className='keyboard'>
              <li>Keyboard</li>
              </div>
            </ul>
          </div>
          </div>
        </div>
      </div>  
      </div>
    </div>
    </div>
    
    </>
  );
};

export default Carousel;

