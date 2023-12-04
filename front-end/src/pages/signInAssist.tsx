import '../styles/signInAssist.css'
import logo from '../assets/logo.png'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInAssist:React.FC = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [error,setError] = useState('');
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
          setError('Email must be filled');
          return;
        }
    
        try {
          const response = await axios.post('http://localhost:4000/api/user/signInAssist', {
            email: email,
          });
    
          if (response.data.emailSent) {
            setError("Email Sent")
            console.log('Link successfully sent to your email');
            navigate('/signIn');
          } else {
            setError("Failed")
            console.log('Failed');
          }
        } catch (error: any) {
          if (error.response.status === 401) {
            setError('Email not registered');
          } else {
            console.error('Error sending forgot password request:', error);
          }
        }

    }
    return (
    <>
    <div className="sign-in-assist">
        <div>
            <img src={logo} alt="logo" className='sign-in-assist-logo' />
        </div>
        <h2>Sign in Assistance</h2>
        <div className='enter-the-email'>
            Enter the email address and we will send you a verification code for you to enter before creating a new password.
        </div>
        <div className='error-assist-msg'>
            {error}
        </div>
        <form action="" className='sign-in-assist-form' onSubmit={onSubmit}>
            <div className='email-label'>
                Email Address
            </div>
            <div>
                <input type="text" onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <button>
                    REQUEST VERIFICATION CODE
                </button>
            </div>
            <div>
                Need Help? <a href="">Contact Customer Service</a>
            </div>
        </form>


    </div>
    </>);
}
 
export default SignInAssist;