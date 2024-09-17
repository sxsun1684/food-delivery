import React, { useContext, useState } from 'react';
import './Login.css';
import { assets } from "../../assets/assets.js";
import { StoreContext } from '../../context/StoreContext';
import axios from "axios"
// import { toast } from 'react-toastify'

const Login = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Login")
    const { setToken, url,loadCartData } = useContext(StoreContext)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }
    // useEffect(() => { console.log(data); }, [data])
    const onLogin=async(event)=>{
        event.preventDefault()
        let new_url = url;
        if (currentState === "Login") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            // loadCartData({token:response.data.token})
            setShowLogin(false)
        }
        else {
            alert(response.data.message)
        }
    }
    return (
        <div className='login'>
            <form onSubmit={onLogin} action="" className="login-frame">
                <div className="login-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-input">
                    {currentState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-consents">
                    <input type="checkbox" required />
                    <p>I agree to the terms of use and privacy policy.</p>
                </div>
                {currentState === "Login"
                    ? <p>Need to create a account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default Login;
