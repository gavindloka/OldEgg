import React from 'react'
import logo from '../assets/logo.png'
import {useState} from 'react';
import '../styles/resetPass.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const ResetPassword = () => {
  const navigate = useNavigate()
  const [password,setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error,setError] = useState('')
  const {token} = useParams();

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      const response = await axios.post(
        'http://localhost:4000/api/user/resetPassword',
        { token, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      
      if(response.status===200){
        navigate('/signIn')
      }else{
        setError(response.data.error || 'Failed to reset password');
      }
    } catch (error) {
        console.log("token",token)
        console.error('Error resetting password:', error);
      setError('error occured');
    }
  };
  
  return (
    <>
    <div className='reset-password-container'>
        <div>
            <img src={logo} alt="" className='reset-pass-logo'/>
        </div>
        <h2>
            Reset Password
        </h2>
        <div className='error-reset'>
            {error}
        </div>
        <div>
            <form action="" className='reset-pass-form' onSubmit={handleResetPassword}>
            <div className='input-label'>
                New Password
            </div>
            <div>
                <input type="password" className='input-pass'onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='input-label'>
                Confirm Password
            </div>
            <div>
                <input type="password" className='input-pass'onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <button className='submit-pass-btn'>
                Submit
            </button>
            </form>
        </div>
        <div></div>
    </div>
    
    
    </>
  )
}

export default ResetPassword

