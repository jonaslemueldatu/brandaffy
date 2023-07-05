import React from 'react';
import "../styles/sections/Affiliateregistrationform.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';

function Affiliateloginform() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const signIn = useSignIn()

    const loginAffiliate = async (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/affiliate/login', {
            email: email,
            password: password
        }).then((res) => {
            if (res.data.error) {
                setError(res.data.error)
            } else {
                signIn({
                    token: res.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: res.data.user_profile,
                })
                navigate('/dashboard/affiliate/profile')
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className='affiliate-landingpage-container'>
            <Link className='affiliate-landingpage-logo-link' to='/affiliate'>
                <img className='affiliate-landingpage-logo' src="https://www.firstx.ai/images/logo.svg" alt='Brandaffy logo' />
            </Link>
            <form onSubmit={loginAffiliate} className='affiliate-landingpage-form-container'>
                <div className='affiliate-landingpage-form'>
                    <h2 className='affiliate-landingpage-header'>Hi, Welcome to Brandaffy!</h2>
                    <div className='affiliate-landingpage-single-field'>
                        <div className='affiliate-landingpage-field'>
                            <label htmlFor='affiliate-register-email'>Email:</label>
                            <input required onFocus={() => {setError("")}} onChange={(e) => { setEmail(e.target.value) }} type='text' id='affiliate-register-email'></input>
                        </div>
                    </div>
                    <div className='affiliate-landingpage-single-field'>
                        <div className='affiliate-landingpage-field'>
                            <label htmlFor='affiliate-register-lastname'>Password:</label>
                            <input required onChange={(e) => { setPassword(e.target.value) }} onFocus={() => {setError("")}} type='password' id='affiliate-register-password'></input>
                        </div>
                    </div>
                </div>
                <p className="affiliate-landingpage-error">{error}</p>
                <button type='submit' className='affiliate-landingpage-signup-cta'>Login</button>
                <p className='affiliate-landingpage-login-redirect'>Not registered yet? <Link to='/affiliate/register'>Create an Account</Link></p>
            </form>
            <div className='affiliate-landingpage-image-container'>
            </div>
        </div >
    )
}

export default Affiliateloginform