import React, { useEffect } from 'react';
import '../styles/navbar.css'
import logo from '../assets/logo.png'
import menu from '../assets/menu.png'
import location from '../assets/location.png'
import searchlogo from '../assets/search.png'
import bell from '../assets/bell.png'
import flag from '../assets/singapore.png'
import light from '../assets/light.png'
import dark from '../assets/dark.png'
import userlogo from '../assets/user.png'
import cart from '../assets/shopping-cart.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const NavBar = ({searchResults,setSearchResults}:any) => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [username, setUsername] = useState('');
  
    const handleLogout = () => {
        localStorage.removeItem('userID');
        localStorage.removeItem('username');
        setUsername('Register/ Sign In');
        navigate('/');
    };
    const fetchData = (value: string) => {
      fetch("http://localhost:4000/api/product/list")
        .then((response) =>
          response.json().then((json) => {
            const filteredResults = json.filter((product: any) => {
              return (
                product &&
                product.name &&
                product.name.toLowerCase().includes(value.toLowerCase())
              );
            });
            setResults(filteredResults);
            setSearchResults(results)
            console.log(search)
            console.log(results)
          })
        );
    };
  
    const handleChange = (value: string) => {
      setSearch(value);
      fetchData(value);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
      fetchData(search);
      navigate(`/search?query=${search}`);
    };
  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('userID');

    if(!isUserLoggedIn){
        setUsername('Register/Sign In');
    }else{
        const storedUsername = localStorage.getItem('username');
        setUsername(storedUsername || '');
    }
  }, []);

  return (
    <>
    <div className='all-navbar'>
    <nav className="navbar">
        <div>
            <img src={menu} alt="menu" className='menu'/>
        </div>
        <div>
            <Link to={'/'}>
            <img src={logo} alt="logo" className='logo'/>
            </Link>
        </div>
        <div className='location-section'>
            <img src={location} alt="location" className='location' />
            <div className='location-item'>
                <div className='deliver-to'>
                    Deliver to
                </div>
                <div className='country'>
                    Singapore
                </div>
            </div>
        </div>
        <form action="" onSubmit={handleSubmit}>
        <div className="search-bar">
            <input type="text" placeholder="" className='search-field' value={search} onChange={(e)=>handleChange(e.target.value)}/>
            <button className='search-btn' type='submit'><img src={searchlogo} alt="" className='search-img'/></button>
        </div>
        </form>
        <div>
            <img src={bell} alt="" className='bell'/>
        </div>
        <div>
            <img src={flag} alt="" className='flag'/>
        </div>
            <label className='switch'>
                <input type="checkbox" />
                <span className='slider'>
                    <img src={dark} alt="dark" className='dark-mode'/>
                    <img src={light} alt="light" className='light-mode'/>
                </span>
            </label>
        <div className='user-section'>
            <img src={userlogo} alt="userlogo" className='user-logo'/>
            <div className='user-item' onClick={()=>navigate('/signIn')}>
                <div className='welcome'>
                    Welcome
                </div>
                <div className='user-name'>
                    {username.toUpperCase()}
                </div>
            </div>

        </div>
            <div className='return-order-section'>
                <div className='return'>
                    Returns
                </div>
                <div className='order'>
                    & Orders
                </div>
            </div>
        <div>
        <Link to={'/cart'}>
            <img src={cart} alt="cart" className='cart'/>
        </Link>
        </div>
    </nav>
    <div className='under-navbar'>
        <div className='choice'>
            <ul className='choice-list'>
                <li><a href="">Free Shipping</a></li>
                <li><a href="">Today's Best Deals</a></li>
                <li><a href="">RTX 4070 TI Series</a></li>
                <li><a href="">New: Intel i9-13900KS</a></li>
                <li><a href="">RTX 4090 Series</a></li>
                <li><a href="">RTX 4080 Series</a></li>
                <li><a href="">ASRock RX 6700 XT</a></li>
                <li><a href="">Build a PC</a></li>
            </ul>
        </div>
        <div className='volume'>
            <ul className='volume-list'>
                <li><a href="">Volume Order</a></li>
                <li>|</li>
                <li><a href="" className='feedback'>FEEDBACK</a></li>
                <li>|</li>
                <li><a href="" className='help'>HELP CENTER</a></li>
                <li>|</li>
                <li>
                    <Link to={'/wishlist'}>
                    <a href="" className='help'>WISHLIST</a>
                    </Link>
                </li>
                <li>|</li>
                <li><a href="" className='help' onClick={handleLogout}>LOGOUT</a></li>
            </ul>
        </div>
    </div>
    </div>
    </>
  );
};

export default NavBar;
