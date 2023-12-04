import React, { useEffect, useState } from 'react'
import NavBar from '../components/navbar'
import Footer from '../components/footer';
import ShopHeader from '../components/shopHeader';
import '../styles/shopReviewPage.css'
import { useNavigate } from 'react-router-dom';

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
interface Review{
  id: number,
  customerName:string,
  orderedOn: string,
  rating: number,
  description: string
}

const ShopReviewPage = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState<Review[]>([]);
  const [shops, setShops] = useState<Shop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [searchInput, setSearchInput] = useState<string>('');
  const [timeFrame, setTimeFrame] = useState<string>('overall'); 
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
  useEffect(() => {
    fetch('http://localhost:4000/api/review/reviewDetail')
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data:', data);
        setReviews(data);
      })
      .catch((error) => console.error('Error fetching review:', error));
  }, []);


  const filteredReviews = reviews.filter((review) =>
   {
    const containsSearchInput =  review.description.toLowerCase().includes(searchInput.toLowerCase())
    const orderedDate = new Date(review.orderedOn);
    const today = new Date();
    console.log(today)


    switch (timeFrame) {
      case 'last30':
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate()-30)
        return containsSearchInput && orderedDate >= thirtyDaysAgo;
      case 'last60':
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(today.getDate()-60)
        return containsSearchInput && orderedDate >= sixtyDaysAgo;
      case 'last12Months':
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setFullYear(today.getFullYear() - 1);
        return containsSearchInput && orderedDate >= twelveMonthsAgo;
      default:
        return containsSearchInput;
    }
  
  }
  );

  

  return (
    <>
    <nav>
    <NavBar searchResults={searchResults} setSearchResults={setSearchResults}/>
    </nav>
    <div>
      <ShopHeader/>
    </div>
    <div className='feedback-container'>
      <div className='feedback-header'>
      <div className='feedback-title'>
        FEEDBACK
      </div>
      <div className='filter-btn-master-container'>
        <div className='filter-btn-container'>
          <button className='filter-btn-left' onClick={()=>setTimeFrame('overall')}>
            OVERALL
          </button>
        </div>
        <div className='filter-btn-container'>
          <button className='filter-btn' onClick={()=>setTimeFrame('last30')}>
            LAST 30 DAYS
          </button>
        </div>
        <div className='filter-btn-container'>
          <button className='filter-btn' onClick={()=>setTimeFrame('last60')}>
          LAST 60 DAYS
          </button>
        </div>
        <div className='filter-btn-container'>
          <button className='filter-btn-right' onClick={()=>setTimeFrame('last12Months')}>
            LAST 12 MONTHS
          </button>
        </div>
      </div>
      </div>
      <div className='feedback-body'>
        <div className='rating-body'>
        <div className='rating-amount'>
        {shops?.ratings} ratings
        </div>
        <div className='to-rate'>
          To rate this seller or report a problem, please use the link provided in the order confirmation email History section located in your account settings
        </div>
        </div>    
        <div className='shop-percentage-container'>
        <div className='circle-progress'>
          <div>
            <div className='percentage'>
            {shops?.onTimeDelivery}%
            </div>
            <div>
            ON-TIME DELIVERY
            </div>
          </div>
          </div>
          <div>
          <div className='circle-progress'>
            <div className='percentage'>
            {shops?.productAccuracy}%
            </div>
            <div>
            PRODUCT ACCURACY
            </div>
          </div>
          </div>
          <div className='circle-progress'>
            <div className='percentage'>
            {shops?.serviceSatisfaction}% 
            </div>
            <div>
            SERVICE SATISFACTION
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className='review-header'>
        <div>
        <form action="" className='search-review' onSubmit={(e)=>{
          e.preventDefault();
          setSearchResults(filteredReviews);
        }}>
          <div className='search-text'>
            Search Reviews:
          </div>
          <div>
          <input 
          type="text" 
          placeholder='Keywords' 
          className='input-review'
          onChange={(e)=>setSearchInput(e.target.value)}/>
          </div>
          <div>
          <button type='submit' className='go-button'>GO</button>
          <div>
            <button className='reset-btn' onClick={(e)=>{
              setTimeFrame('overall')
              setSearchInput('');
              navigate('/shopReview')
              window.location.reload();}}>RESET</button>
          </div>
          </div>
          </form>
        </div>
      </div>
      <div className='review-list-container'>
        <ul className='review-list'>
          {
          filteredReviews.map((review)=>(
            <div className='review-container'>
            <li key={review.id} className='review-container-list'>
              <div className='customer-container'>
                <div className='customer-name'>
                {review.customerName}
                </div>
                <div className='ordered-on'>
                  <div>
                    Ordered On:
                  </div>
                  <div>
                  {review.orderedOn}
                  </div>
                </div>
              </div>
              <div>
                <div className='review-rating'>
                Rating: {review.rating}
                </div>
                <div>
                  {review.description}
                </div>
              </div>
            </li>
            </div>
          ))}
        </ul>
      </div>
    <footer>
      <Footer />
    </footer>
    </>
  )
}

export default ShopReviewPage