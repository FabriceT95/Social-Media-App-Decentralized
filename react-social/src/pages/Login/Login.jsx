import React, { useRef } from 'react'
import './login.css'
import { loginCall } from '../../apiCalls';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from "@material-ui/core"
import { Link } from 'react-router-dom';

const Login = () => {

    const email = useRef();
    const password = useRef();

    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleSubmit = (e) => {
        const currentEmail = email.current.value;
        const currentPassword = password.current.value;
        e.preventDefault();
        loginCall({ email: currentEmail, password: currentPassword }, dispatch)
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
                        <input type="email" placeholder='Email' required className="loginInput" ref={email} />
                        <input type="password" placeholder='Password' minLength={6} required className="loginInput" ref={password} />
                        <button className="loginButton" disabled={isFetching} >{isFetching ? <CircularProgress color="white" size={15} /> : "Log In"}</button>
                        <span className="loginForgot">Forgot password ?</span>
                        <Link to="/register">
                            <button className="loginRegisterButton">{isFetching ? <CircularProgress color="white" size={15} /> : "Create a new account"}</button>
                        </Link>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login