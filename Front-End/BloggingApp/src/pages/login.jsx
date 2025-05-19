import React from "react";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {


    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('');
    const [messageColor,setMessageColor] = useState('');
    const navigate = useNavigate();

    const gotoSingUp = () => {
      navigate("/register")
    }
    
    const handleSubmit  = async (e) =>{
    e.preventDefault()
    try{
        const response = await fetch('http://localhost:5500/api/auth/login',{
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({email,password}),
        });
    
        if(response.ok){
            const result = await response.json();
            localStorage.setItem('token',result.token)
            setMessage(result.message);
            setMessageColor('green');
            navigate('/posts')
        } else{
            const error =await response.json();
            setMessage(error.message);
            setMessageColor('red');
        }
    
    } catch (err){
        console.error(err);
        setMessage('Something went wrong!');
        setMessageColor('red');
    }
    
    
    
    }
    


  return (
    <>
      <div className="loginPage">
        <div className="logoImg">
          <img src="logo.png" alt="" />
        </div>

        <div className="loginForm">
          <h1>Sing In</h1>
          <form onSubmit={handleSubmit} >
            
            <input
              type="email"
              placeholder="Email"
              required
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              id="password"
              minLength={6}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p id="message" style={{ color: messageColor }}>
              {message}
            </p>
            <button role="Submit">Sign In</button>

            <p className="singUpLnk"> you don't have account ? <a onClick={gotoSingUp}>Sing Up</a></p>
          </form>
        </div>
      </div>
    </>
  );
}
