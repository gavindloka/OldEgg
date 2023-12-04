import logo from '../assets/logo.png'
import '../styles/signIn.css';
import google from '../assets/google.png'
import apple from '../assets/apple.png'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userID, setUserID] = useState('');
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {  
            setError("All fields must be filled");
            return;
         } 
  try {
    const response = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      setUserID(userData.ID);
      localStorage.setItem('userID',userData.ID)
      localStorage.setItem('username', `${userData.firstName} ${userData.lastName}`);
      console.log('Login successful!User:',userData.firstName,' ',userData.lastName);
      navigate('/');
    } else {
      if (response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An error occurred during login. Please try again later.');
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
};

    return (
        <>
        <div className='sign-in-container'>
            <div>
                <img src={logo} alt="logo" className='sign-in-logo' />
            </div>
            <h2>Sign In</h2>
            <form className='sign-in-form' onSubmit={handleSignIn}>
                <div className='error-msg'>
                {error}
                </div>
                <div>
                <input
                type='text'
                name='email'
                placeholder='Email Address'
                onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div>
                    <a href=""><button className='sign-in-btn' type='submit'>SIGN IN</button></a>
                </div>
            </form>
            <div className='under-sign-in'>
                <div>
                    <button className='code-btn' onClick={()=>navigate('/signInAssist')}>GET ONE-TIME SIGN IN CODE</button>
                </div>
                <div>
                    <a href="" className='what-one-time'>What's the one time code</a>
                </div>
                <div>
                    New to Oldegg? <a href="" className='sign-up' onClick={() => navigate('/signUp')}>Sign Up</a>
                </div>
                <div>
                    OR
                </div>
                <div className='third-app-btn'>
                    <button><img src={google} alt="google" className='third-app-icon1'/>SIGN IN WITH GOOGLE</button>
                </div>
                <div className='third-app-btn'>
                    <button><img src={apple} alt="" className='third-app-icon2'/>SIGN IN WITH APPLE</button>
                </div>  
            </div>
        </div>
        </>
    );
}


export default SignIn


