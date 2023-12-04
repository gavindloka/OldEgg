import React, { useState } from 'react'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import ShopAboutUsFooter from '../components/shopAboutUsFooter'
import { Link } from 'react-router-dom'

const WishlishFollow = () => {
    const [searchResults, setSearchResults] = useState('')
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
              <li className="wishlist-navbar-list"><Link to={'/wishlist'} className='public-link'>My Lists</Link></li>
              <li className="wishlist-navbar-list"><Link to={'/wishlistFollow'} className='public-link'><b>Followed Lists</b></Link></li>
              <li className="wishlist-navbar-list"><Link to={'/wishlistPublic'} className='public-link'>Public Lists</Link></li>
            </ul>
          </div>
        </div>
      </div>
    <div>
        Followed Wishlist Page
    </div>
    <div>
        <ShopAboutUsFooter/>
    </div>
    <footer>
        <Footer />
    </footer>
    </>
  )
}

export default WishlishFollow