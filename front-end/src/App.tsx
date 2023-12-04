import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homePage';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import SignInAssist from './pages/signInAssist';
import SearchPage from './pages/searchPage';
import ResetPassword from './pages/resetPassword';
import ShopHomePage from './pages/shopHomePage';
import ShopProductPage from './pages/shopProductPage';
import ShopReviewPage from './pages/shopReviewPage';
import ShopAboutUs from './pages/shopAboutUs';
import WishList from './pages/wishListPage';
import ProductDetail from './pages/productDetail';
import ShoppingCart from './pages/shoppingCartPage';
import WishlistPublicPage from './pages/wishListPublicPage';
import WishListDetail from './pages/wishListDetail';
import WishlishFollow from './pages/wishListFollow';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:id' element={<HomePage />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signInAssist' element={<SignInAssist />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/resetPassword/:token' element={<ResetPassword />} />
          <Route path='/shopHome' element={<ShopHomePage />} />
          <Route path='/shopProduct' element={<ShopProductPage />} />
          <Route path='/shopReview' element={<ShopReviewPage />} />
          <Route path='/shopAboutUs' element={<ShopAboutUs />} />
          <Route path='/wishlist'element={<WishList/>} /> 
          <Route path='/wishlistPublic' element={<WishlistPublicPage/>}/>
          <Route path='/wishlist/:id' element={<WishListDetail/>}/>
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<ShoppingCart />} />
          <Route path ='/wishlistFollow' element={<WishlishFollow/>}/>
        </Routes>
      </Router>
  );
}



export default App;
