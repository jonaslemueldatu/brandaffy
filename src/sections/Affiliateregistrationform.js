import React from 'react';
import "../styles/sections/Affiliateregistrationform.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Affiliateregistrationform() {
 
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [platform, setPlatform] = useState([])
    const [tiktokc, setTiktokc] = useState(false)
    const [instagramc, setInstagramc] = useState(false)
    const [facebookc, setFacebookc] = useState(false)
    const navigate = useNavigate()

    const registerAffiliate = (event) => {
        event.preventDefault();
        axios.post('https://brandaffy-api.onrender.com/api/affiliate/register', {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            platform: platform
        }).then((res) => {
            console.log(res.data)
            navigate('/')
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        const handleFacebookc = facebookc ? setPlatform(plat => [...plat, 'Facebook']) : setPlatform(platform => {
            return platform.filter(plat => plat !== 'Facebook')
        })
    }, [facebookc]);
    useEffect(() => {
        const handleTiktokc = tiktokc ? setPlatform(plat => [...plat, 'Tiktok']) : setPlatform(platform => {
            return platform.filter(plat => plat !== 'Tiktok')
        })
    }, [tiktokc]);
    useEffect(() => {
        const handleInstagramc = instagramc ? setPlatform(plat => [...plat, 'Instagram']) : setPlatform(platform => {
            return platform.filter(plat => plat !== 'Instagram')
        })
    }, [instagramc]);


    return (
        <div className='affilate-landing-page-container'>
            <Link className='affiliate-landingpage-logo-link' to='/affiliate'>
                <img Lin className='affiliate-landingpage-logo' src="https://www.firstx.ai/images/logo.svg" alt='Brandaffy logo' />
            </Link>
            <form onSubmit={registerAffiliate} className='affiliate-landingpage-form-container'>
                <div className='affiliate-landingpage-form'>
                    <h2 className='affilaite-landingpage-header'>Hi, Welcome to Brandaffy!</h2>
                    <div className='affiliate-landingpage-two-fields'>
                        <div className='affiliate-landingpage-field'>
                            <label for='affiliate-register-firstname'>First Name:</label>
                            <input onChange={(e) => { setFirstname(e.target.value) }} type='text' id='affiliate-register-firstname'></input>
                        </div>
                        <div className='affiliate-landingpage-field'>
                            <label for='affiliate-register-lastname'>Last Name:</label>
                            <input onChange={(e) => { setLastname(e.target.value) }} type='text' id='affiliate-register-lastname'></input>
                        </div>
                    </div>
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
                    <div id='affilaite-landingpage-platform' className='affiliate-landingpage-single-field'>
                        <label >Platform:</label>
                        <div>
                            <input onClick={(e) => setTiktokc(!tiktokc)} type='checkbox' id='affiliate-register-tiktok' value={'tiktok'}></input>
                            <label for='affiliate-register-tiktok'>Tiktok</label>
                        </div>
                        <div>
                            <input onClick={(e) => setInstagramc(!instagramc)} type='checkbox' id='affiliate-register-instagram'></input>
                            <label for='affiliate-register-instagram'>Instagram</label>
                        </div>
                        <div>
                            <input onClick={(e) => setFacebookc(!facebookc)} type='checkbox' id='affiliate-register-facebook'></input>
                            <label for='affiliate-register-facebook'>Facebook</label>
                        </div>
                    </div>
                </div>
                <button type='submit' className='affilaite-landingpage-signup-cta'>Sign up</button>
                <p className='affilaite-landingpage-login-redirect'>Already have an account? <Link to='/affiliate/login'>Login</Link></p>
            </form>
            <div className='affiliate-landingpage-image-container'>
            </div>
        </div >
    )
}

export default Affiliateregistrationform