import React from 'react';
import "../styles/sections/Affiliateregistrationform.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';

function Affiliateloginform() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const signIn = useSignIn()

    const loginAffiliate = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/affiliate/login`, {
                email: email,
                password: password
            })

            console.log(res)

            signIn({
                token: res.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: res.data.user_profile,
            })

            if (res.status == 200) {
                navigate('/dashboard')
            }

        } catch (err) {
            console.log(err)
        }

    }

    return (
        <div className='affilate-landing-page-container'>
            <Link className='affiliate-landingpage-logo-link' to='/affiliate'>
                <img Lin className='affiliate-landingpage-logo' src="https://www.firstx.ai/images/logo.svg" alt='Brandaffy logo' />
            </Link>
            <form onSubmit={loginAffiliate} className='affiliate-landingpage-form-container'>
                <div className='affiliate-landingpage-form'>
                    <h2 className='affilaite-landingpage-header'>Hi, Welcome to Brandaffy!</h2>
                    <div className='affiliate-landingpage-single-field'>
                        <div className='affiliate-landingpage-field'>
                            <label for='affiliate-register-email'>Email:</label>
                            <input onChange={(e) => { setEmail(e.target.value) }} type='text' id='affiliate-register-email'></input>
                        </div>
                    </div>
                    <div className='affiliate-landingpage-single-field'>
                        <div className='affiliate-landingpage-field'>
                            <label for='affiliate-register-lastname'>Password:</label>
                            <input onChange={(e) => { setPassword(e.target.value) }} type='password' id='affiliate-register-password'></input>
                        </div>
                    </div>
                </div>
                <button type='submit' className='affilaite-landingpage-signup-cta'>Login</button>
                <p className='affilaite-landingpage-login-redirect'>Not registered yet? <Link to='/affiliate/register'>Create an Account</Link></p>
            </form>
            <div className='affiliate-landingpage-image-container'>
            </div>
        </div >
    )
}

export default Affiliateloginform