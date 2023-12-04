import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import { Link } from 'react-router-dom'
import ShopAboutUsFooter from '../components/shopAboutUsFooter';
import '../styles/wishlistPublic.css'
interface Wishlist{
    wishlistID: number;
    wishlistName: string;
    userID: number;
    wishlist: number;
    notes: string; 
  }

  interface WishlistDetail{
    wishlistID:number;
    productID: number;
    quantity: number;
    addedAt: string;
  }
  interface Product {
    id: number;
    name: string;
    price: number;
    rating: number;
    shipping: number;
    category: string;
    imageURL: string;
  }

const WishlistPublicPage = () => {
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const[publicWishlists,setPublicWishlists] = useState<Wishlist[]>([]);
    const[productDetails,setProductDetails] = useState<any[]>([]);
    const [wishlistDetails,setWishlistDetails] = useState<WishlistDetail[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
    const calculateTotalPrice = (products: Product[]) => {
        return products.reduce((total, product) => total + product.price, 0);
      };
      useEffect(() => {
        fetch('http://localhost:4000/api/wishlist/publicWishlist')
          .then((response) => response.json())
          .then((data) => {
            console.log('Received publicWishlists data:', data);
            setPublicWishlists(data);
            const wishlistIDs = data.map((wishlist:any) => wishlist.wishlistID);
            setWishlistDetails(wishlistIDs);
          })
          .catch((error) => console.error('Error fetching publicWishlists:', error));
      }, []);
    
      useEffect(() => {
        const fetchWishlistDetails = async (wishlistID: number) => {
          try {
            const response = await fetch(`http://localhost:4000/api/wishlist/detail/list/${wishlistID}`);
            if (!response.ok) {
              throw new Error(`Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`Received wishlist details for wishlistID ${wishlistID}:`, data);
          } catch (error) {
            console.error(`Error fetching wishlist details for wishlistID ${wishlistID}`, error);
          }
        };
        const fetchProductDetails = async (wishlistID: number) => {
            try {
              const response = await fetch(`http://localhost:4000/api/wishlist/detail/list/product/${wishlistID}`);
              if (!response.ok) {
                throw new Error(`Status: ${response.status}`);
              }
              const data = await response.json();
              console.log(`Received product details for wishlistID ${wishlistID}:`, data);
              setProductDetails((prevDetails) => [...prevDetails, { wishlistID, products: data }]);
            } catch (error) {
              console.error(`Error fetching product details for wishlistID ${wishlistID}`, error);
            }
          };
        wishlistDetails.forEach((wishlistID: any) => {
          fetchProductDetails(wishlistID)
          fetchWishlistDetails(wishlistID);
        });
      }, [wishlistDetails]);
      const filteredWishlists = publicWishlists
    .filter((wishlist) => {
      if (selectedPriceRanges.length === 0) {
        return true;
      }

      const totalWishlistPrice = productDetails
        .filter((details) => details.wishlistID === wishlist.wishlistID)
        .flatMap((details) => details.products)
        .reduce((total, product) => total + product.price, 0);

      return selectedPriceRanges.some((range) => {
        const [min, max] = range.split('-').map(Number);
        return totalWishlistPrice >= min && totalWishlistPrice <= max;
      });
    });
  return (
    <>
    <nav>
        <NavBar  searchResults={searchResults} setSearchResults={setSearchResults}/>
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
              <li className="wishlist-navbar-list"><Link to={'/wishlistFollow'} className='public-link'>Followed Lists</Link></li>
              <li className="wishlist-navbar-list"><Link to={'/wishlistPublic'} className='public-link'><b>Public Lists</b></Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className='filter-and-body'>
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
      checked={selectedPriceRanges.includes('1000-3000')}
      onChange={() => handlePriceRangeChange('1000-3000')}/>
      </div>
      <div>
        $1000-$3000
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedPriceRanges.includes('3000-5000')}
      onChange={() => handlePriceRangeChange('3000-5000')}/>
      </div>
      <div>
      $3000-$5000
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedPriceRanges.includes('5000-7000')}
      onChange={() => handlePriceRangeChange('5000-7000')}/>
      </div>
      <div>
      $5000-$7000
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedPriceRanges.includes('7000-9000')}
      onChange={() => handlePriceRangeChange('7000-9000')}/>
      </div>
      <div>
      $7000-$9000
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedPriceRanges.includes('9000-11000')}
      onChange={() => handlePriceRangeChange('9000-11000')}/>
      </div>
      <div>
      $9000-$11000
      </div>
    </div>
    <div className='filter'>
      <div>
      <input 
      type="checkbox" 
      name="category"
      checked={selectedPriceRanges.includes('11000-13000')}
      onChange={() => handlePriceRangeChange('11000-13000')}/>
      </div>
      <div>
    $11000-$13000
      </div>
    </div>
    <div className='filter'>
      <div>
      <input type="checkbox" 
      name="category"  
      checked={selectedPriceRanges.includes('13000-15000')}
      onChange={() => handlePriceRangeChange('13000-15000')}/>
      </div>
      <div>
      $13000-$15000
      </div>
    </div>
    </div>
    
    </div>
    <div className='public-wishlists-container'>
  {filteredWishlists.map((wishlist) => {
    let totalWishlistPrice = 0;

    return (
      <div key={wishlist.wishlistID} className='public-wishlist-item'>
        <div>
          <h3>{wishlist.wishlistName}</h3>
          <ul className='product-public-container'>
            {productDetails.map((details) => {
              if (details.wishlistID === wishlist.wishlistID) {
                totalWishlistPrice = calculateTotalPrice(details.products);

                return details.products.map((product: Product) => (
                  <li key={product.id}>
                    <div>
                      <img src={product.imageURL} alt={product.name} className='product-image' />
                    </div>
                    <div className='product-name'>{product.name}</div>
                  </li>
                ));
              }
              return null;
            })}
          </ul>
        </div>
        <div className='name-and-view'>
          <div>
            <b>Total Price: ${totalWishlistPrice.toFixed(1)}</b>
          </div>
          <div>
            {productDetails.find((details) => details.wishlistID === wishlist.wishlistID)?.products.length || 0} items
          </div>
          <div>
            <b>By Anonymous</b>
          </div>
          <div>
            <Link to={`/wishlist/${wishlist.wishlistID}`}className='view-wishlist-link'>View Wishlist</Link>
          </div>
        </div>
      </div>
    );
  })}
</div>

    </div>
    <div>
        <ShopAboutUsFooter/>
    </div>
    <footer>
        <Footer />
    </footer>
    </>
  )
  function handlePriceRangeChange(priceRange: string) {
      if (selectedPriceRanges.includes(priceRange)) {
        setSelectedPriceRanges((prevRanges) =>
          prevRanges.filter((range) => range !== priceRange)
        );
      } else {
        setSelectedPriceRanges((prevRanges) => [...prevRanges, priceRange]);
      }
    }
  };
export default WishlistPublicPage