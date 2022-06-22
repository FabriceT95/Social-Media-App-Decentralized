import axios from 'axios';
import React, { useRef } from 'react'
import './register.css'
import { Link, useNavigate } from "react-router-dom"

const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentEmail = email.current.value;
        const currentUsername = username.current.value;
        const currentPassword = password.current.value;
        const currentConfirmPassword = confirmPassword.current.value;



        if (currentPassword !== currentConfirmPassword) {
            password.current.setCustomValiditty("Passwords don't match!");
        } else {
            const user = {
                username: currentUsername,
                email: currentEmail,
                password: currentPassword
            }

            try {
                await axios.post("/auth/register", user);
                navigate("/login")
            } catch (error) {
                console.log(error)
            }


        }




    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="loginLogo">Lamasocial</div>
                    <span className="loginDesc">Connect with friends and the world around you on Lamasocial. </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input type="text" placeholder='Username' className="loginInput" ref={username} />
                        <input type="email" placeholder='Email' className="loginInput" ref={email} />
                        <input type="password" placeholder='Password' minLength={6} className="loginInput" ref={password} />
                        <input type="password" placeholder='Confirm Password' minLength={6} className="loginInput" ref={confirmPassword} />
                        <button  className="loginButton">Sign up</button>

                        <Link to="/login">
                            <button className="loginRegisterButton">Log into Account</button>
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register