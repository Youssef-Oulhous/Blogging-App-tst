import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor , setmessageColor] = useState('');
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5500/api/auth/register', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('token', result.token)
        setMessage(result.message);
        setmessageColor('green');
        navigate('/posts')
      } else {
        const error = await response.json();
        setMessage(error.message);
        setmessageColor('red')
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
      setmessageColor('red');
    }
  };


  return (
   <>
    <div className="registerPage">
    <div className="logoImg">
      <img src="logo.png" alt="" />
    </div>

    <div className="registerForm">
      <h1>register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required id="name" onChange={(e)=>setName(e.target.value)}/>
        <input type="email" placeholder="Email" required id="email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" required id="password" minLength={6} onChange={(e)=>setPassword(e.target.value)}/>
        <p id="message" style={{color:messageColor}}>{message}</p>
        <button role="Submit">Register</button>
        <p className="singUpLnk">you alredy have account ? <a onClick={goToLogin}>Sing In</a></p>
      </form>
    </div>
    </div>
   </>
  );
}
