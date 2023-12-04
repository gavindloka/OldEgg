  import React, { useState } from 'react'
  import NavBar from '../components/navbar'
  import Footer from '../components/footer'
  import Carousel from '../components/homePage/carousel'
  import '../styles/homePage/homePage.css'
  import ProductList from '../components/homePage/productList'

  const HomePage = () => {
    const [searchResults, setSearchResults] = useState([]);
    return (
      <>
      <nav className='navbar-home-page'>
        <NavBar searchResults={searchResults} setSearchResults={setSearchResults}/>
      </nav>
      <div>
      <div className='carousel-home-page'>
        <Carousel />
      </div>
      <div>
      <h1 className='product-list-title'>FEATURED PRODUCTS</h1>
        <ProductList/>
      </div>
      </div>
      <footer>
        <Footer/>
      </footer>
      </>
    )
  }

  export default HomePage