import React from 'react'
import '../styles/sections/Brandregistrationform.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSignIn } from 'react-auth-kit'

function Brandregistrationform() {


    const navigate = useNavigate()
    const signIn = useSignIn()

    const [brandlogo] = useState("https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png")

    const [brand, setBrand] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const registerBrand = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_ROUTE}/api/brand/register`, {
            brand_name: brand,
            email: email,
            password: password,
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
                alert("You are here")
                navigate('/dashboard/brand/profile')
            }
        }).catch(err => console.log(err))
    }


    return (
        <div className='brand-landingpage-container'>
            <form onSubmit={registerBrand} className='brand-landingpage-form-container'>
                <Link className='brand-landingpage-logo-link' to='/'>
                    <img className='brand-landingpage-logo' src={brandlogo} alt='Brandaffy logo' />
                </Link>
                <div className='brand-landingpage-form'>
                    <div className='brand-landingpage-header'>Hi, Welcome to Brandaffy!</div>
                    <div className='brand-landingpage-two-fields'>
                        <div className='brand-landingpage-field'>
                            <label htmlFor='brand-register-brand'>Brand Name:</label>
                            <input required onFocus={() => setError("")} onChange={(e) => { setBrand(e.target.value) }} type='text' id='brand-register-brand'></input>
                        </div>
                        <div className='brand-landingpage-field'>
                            <label htmlFor='brand-register-email'>Email:</label>
                            <input required onFocus={() => setError("")} onChange={(e) => { setEmail(e.target.value) }} type='text' id='brand-register-email'></input>
                        </div>
                    </div>
                </div>

                <div className='brand-landingpage-single-field'>
                    <div className='brand-landingpage-field'>
                        <label htmlFor='brand-register-lastname'>Password:</label>
                        <input required onChange={(e) => { setPassword(e.target.value) }} type='password' id='brand-register-password'></input>
                    </div>
                </div>
                <p className="brand-landingpage-error">{error}</p>
                <button type='submit' className='brand-landingpage-signup-cta'>Sign up</button>
                <p className='brand-landingpage-login-redirect'>Already have an account? <Link to='/brand/login'>Login</Link></p>

            </form>
            <div className='brand-landingpage-image-container'>
            </div>
        </div>
    )
}

export default Brandregistrationform