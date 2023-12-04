import logo from '../assets/logo.png'
import '../styles/signUp.css'
import { useNavigate } from 'react-router-dom';
import { useState} from 'react';


import check from '../assets/checklist.png'
const SignUp:React.FC = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password || !phone) {
          setError("All fields must be filled");
          return;
        } else if (!phone.match("^[0-9]+$") || phone.length > 13 || phone.length < 10) {
          setError("Phone must be numeric and between 10 until 13 characters");
          return;
        } else if (
          !password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
        ) {
          setError(
            "Password must contain capital letters, lower-case letters, numbers, and special symbols, and has a length of 8 – 30 characters."
          );
          return;
        }
      
        try {
          const userData = {
            firstName,
            lastName,
            email,
            phone,
            password,
          };
          const response = await fetch('http://localhost:4000/api/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
      
          if (response.ok) {
            console.log('Registration successful!');
            navigate('/signIn');
          } else {
            setError('Registration failed. Email is already used.');
          }
        } catch (error) {
          console.error('Error during registration:', error);
        }
      };
      
    return ( 
    <>
    <div className="sign-up-container">
        <div>
            <img src={logo} alt="logo" className='sign-up-logo'/>
        </div>
        <h2>Create Account</h2>
        <div className='shopping-business'>
            Shopping for your business? <a href="" className='create-business-acc'>Create a free business account.</a>
        </div>
        <div className='error-msg'>
            {error}
        </div>
        <form action="" className='sign-up-form' onSubmit={onSubmit}>
            <div>
                <input type="text" name="first-name"placeholder='First Name' className='input-data' onChange={(e)=> setFirstName(e.target.value)}/>
            </div>
            <div>
                <input type="text" name='last-name'placeholder='Last Name' className='input-data' onChange={(e)=> setLastName(e.target.value)}/>
            </div>
            <div>
                <input type="text" name='email' placeholder='Email Address' className='input-data' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <input type="text" name='phone' placeholder='Mobile Phone Number (optional)'className='input-data' onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div>
                <input type="password" name='password' placeholder='Password' className='input-data' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='validation'>
                <div className='including'>
                    <div>
                        Including 3 of the following :
                    </div>
                    <div>
                        <ul>
                            <li><img src={check} alt="check" />ABC</li>
                            <li><img src={check} alt="check" />abc</li>
                            <li><img src={check} alt="check" />123</li>
                            <li><img src={check} alt="check" />@#$</li>
                        </ul>
                    </div>
                </div>
                <div className='must-contain'>
                    <div>
                        Must Contain:
                    </div>
                    <div>
                        <ul>
                            <li><img src={check} alt='check' />8-30 Chars</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='subs-check'>
                <div>
                    <input type="checkbox" name='subscribe'/>
                </div>
                <div>
                    Subscribe for exclusive e-mail offers and discounts
                </div>
            </div>
            <div className='bycreating'>
                <span>By creating an account, you aggree to Oldegg's </span>
                <a href="" className='privacy'>Privacy Notice</a> 
                <span> and </span>
                <a href="" className='terms'>Terms of Use.</a>
            </div>
            <div>
                <button type='submit' value="Submit" className='sign-up-btn'>SIGN UP</button>
            </div>
            <div>
                Have an account? <a href="" className='sign-in-link' onClick={()=>navigate('/signIn')}>Sign In</a>
            </div>
        </form>
    </div> 
    </>
    );
}
 
export default SignUp;