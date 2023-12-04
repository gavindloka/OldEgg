import React from 'react'
import laptop from '../assets/laptop-aboutus.png'
import qr from '../assets/qrbarcode.jpg'
const ShopAboutUsFooter = () => {
  return (
    <>
        <div className='about-us-under'>
      <div className='left-container'>
      <div className='about-us-under-left'>
      <div className='deals-just-for-you'>
        DEALS JUST FOR YOU 
      </div>
      <div className='sign-up-to-container'>
        <div className='sign-up-to'>
          Sign Up to receive exclusive offers in your index
        </div>
          <div>
            <input type="text" placeholder='Enter your a email' className='email-input'/><button className='sign-up-about-us-btn'>SIGN UP</button>
          </div>
        </div>
      </div>
      <div>
      <img src={laptop} alt="laptop" className='laptop-image' />
      </div>
      </div>
          <div className='right-container'>
            <div className='download-our-app'>
              DOWNLOAD OUR APP
            </div>
            <div className='detail-right-container'>
              <div>
                  <img src={qr} alt="" className='imageqr'/>
              </div>
              <div>
              <div className='scanqr'>
              Scan the qr code to download App
              </div>
              <div>
                Scan this code with your phone's camera
              </div>
              </div>
            </div>
          </div>
    </div>
    </>
  )
}

export default ShopAboutUsFooter