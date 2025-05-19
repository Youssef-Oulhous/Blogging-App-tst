import React from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";


export default function HomePage () {

    const navigate = useNavigate();

    const goToLogin = () => {
    navigate("/login");
    };

    const goToRegister = () => {
    navigate("/register");
    };

    return(
        <>
        <div>
            <div className="header">
                <div className="navtxt">
                        <ul>
                            <li>about</li>
                            <li>contact</li>
                        </ul>
                </div>

                <div className="logo">
                    <img src="public/logo.png" alt="" />
                </div>

                <div className="signIn">
                    <button onClick={goToLogin}>Sign In</button>
                </div>
            </div>

            <div className="body">
                <div className="heroHeader">
                        <h1>Unleash Your Voice <br /> with Blogify!</h1>
                        <p>Your voice matters. Share your ideas, inspire others, and make your <br />
                             mark on the world. Sign up today and start your journey with <br />
                             Blogify — where every story finds its audience.</p>

                        <button onClick={goToRegister}>Sing Up</button>
                </div>

                <div className="carts">
                    <div className="cart1">
                        <img src="person1.jpeg" alt="" />
                        <h3>John</h3>
                        <p>Blogify gave me the voice I never knew I had. Sharing my stories has never been easier!</p>
                    </div>

                    <div className="cart1">
                    <img src="person3.jpeg" alt="" />
                        <h3>floyd</h3>
                        <p>An amazing platform — simple, powerful, and built for creators like me.</p>
                    </div>

                    <div className="cart1">
                    <img src="person2.jpeg" alt="" />
                        <h3>johson</h3>
                        <p>In just a few clicks, I published my first blog. Blogify made my dream of writing for an audience come true!</p>
                    </div>
                </div>

                <div>

                    <br />
                    <br />
                </div>
            </div>

            <div className="footer-container">
                <div className="footer-left">
                    
                <p>&copy; 2025 BLOGIFY. All rights reserved.</p>
                </div>
                <div className="footer-right">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                </div>
            </div>
        </div>
        
        </>
    )
}