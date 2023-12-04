import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import '../styles/searchPage.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  shipping: number;
  category: string;
  imageURL:string;
}

const SearchPage:React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 2;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredResults = 
    selectedCategory != null 
    ? searchResults.filter((result)=> result.category === selectedCategory)
    :searchResults;
  const currentResults = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  return (
    <>  
    <div>
    <nav>
        <Navbar searchResults={searchResults} setSearchResults={setSearchResults}/>
    </nav>
    <div className='search-page-header'>
      <div className='home-sg'>
      Home - Singapore &gt; Search Results : {searchQuery && `${searchQuery}`}
      </div>
      <div className='item-name'>
      {searchQuery && `${searchQuery}`}
      </div>
    </div>
    <div className='search-body'>
    <div className='filter-side-bar'>
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
    <div className='product-search-container'>
      <ul className='product-search-list'>
            {currentResults.map((result) => (
              <li key={result.id}>
                <div className='product-image'>
                  <img src={result.imageURL} alt="" />
                </div>
                <div className='product-list-name'>
                {result.name}
                </div>
                <div className='product-search-rating'>Rating: {result.rating}</div>
                <div className='product-search-price'>${result.price}</div>
                <div className='product-search-shipping'>Shipping: {result.shipping}</div>
                <div className='product-search-category'>{result.category}</div>
                <div className='view-shop'>Tech Innovators <a href="" onClick={()=>navigate('/shopHome')}>Visit Store</a></div>
                <Link to={`/products/${result.id}`} className='product-search-link'>
                <button className='view-details'>View Details  &gt;</button>
                </Link>
              </li>
            ))}
      </ul>
      <div className='pagination'>
      {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
    </div>
    </div>
    </div>
    <footer>
      <Footer/>
    </footer>
    </div>
    </>
  )
}

export default SearchPage