import React from 'react';
import "../styles/sections/Affiliateregistrationform.css"
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';

function Affiliateregistrationform() {

    const signIn = useSignIn()

    const [brandlogo] = useState("https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [platform, setPlatform] = useState([])
    const [tiktokc, setTiktokc] = useState(false)
    const [instagramc, setInstagramc] = useState(false)
    const [facebookc, setFacebookc] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const registerAffiliate = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_ROUTE}/api/affiliate/register`, {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            platform: platform
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


    useEffect(() => {
        facebookc ? setPlatform(plat => [...plat, 'Facebook']) : setPlatform(platform => {
            return platform.filter(plat => plat !== 'Facebook')
        })
    }, [facebookc]);
    useEffect(() => {
        tiktokc ? setPlatform(plat => [...plat, 'Tiktok']) : setPlatform(platform => {
            return platform.filter(plat => plat !== 'Tiktok')
        })
    }, [tiktokc]);
    useEffect(() => {
        instagramc ? setPlatform(plat => [...plat, 'Instagram']) : setPlatform(platform => {
            return platform.filter(plat => plat !== 'Instagram')
        })
    }, [instagramc]);


    return (
        <div className='affiliate-landingpage-container'>
            <form onSubmit={registerAffiliate} className='affiliate-landingpage-form-container'>
                <Link className='affiliate-landingpage-logo-link' to='/affiliate'>
                    <img className='affiliate-landingpage-logo' src={brandlogo} alt='Brandaffy logo' />
                </Link>
                <div className='affiliate-landingpage-form'>
                    <div className='affiliate-landingpage-header'>Hi, Welcome to Brandaffy!</div>
                    <div className='affiliate-landingpage-two-fields'>
                        <div className='affiliate-landingpage-field'>
                            <label htmlFor='affiliate-register-firstname'>First Name:</label>
                            <input required onChange={(e) => { setFirstname(e.target.value) }} type='text' id='affiliate-register-firstname'></input>
                        </div>
                        <div className='affiliate-landingpage-field'>
                            <label htmlFor='affiliate-register-lastname'>Last Name:</label>
                            <input required onChange={(e) => { setLastname(e.target.value) }} type='text' id='affiliate-register-lastname'></input>
                        </div>
                    </div>
                    <div className='affiliate-landingpage-single-field'>
                        <div className='affiliate-landingpage-field'>
                            <label htmlFor='affiliate-register-email'>Email:</label>
                            <input required onFocus={() => setError("")} onChange={(e) => { setEmail(e.target.value) }} type='text' id='affiliate-register-email'></input>
                        </div>
                    </div>
                    <div className='affiliate-landingpage-single-field'>
                        <div className='affiliate-landingpage-field'>
                            <label htmlFor='affiliate-register-lastname'>Password:</label>
                            <input required onChange={(e) => { setPassword(e.target.value) }} type='password' id='affiliate-register-password'></input>
                        </div>
                    </div>
                    <div id='affiliate-landingpage-platform' className='affiliate-landingpage-single-field'>
                        <label >Platform:</label>
                        <div>
                            <input onClick={(e) => setTiktokc(!tiktokc)} type='checkbox' id='affiliate-register-tiktok' value={'tiktok'}></input>
                            <label htmlFor='affiliate-register-tiktok'>Tiktok</label>
                        </div>
                        <div>
                            <input onClick={(e) => setInstagramc(!instagramc)} type='checkbox' id='affiliate-register-instagram'></input>
                            <label htmlFor='affiliate-register-instagram'>Instagram</label>
                        </div>
                        <div>
                            <input onClick={(e) => setFacebookc(!facebookc)} type='checkbox' id='affiliate-register-facebook'></input>
                            <label htmlFor='affiliate-register-facebook'>Facebook</label>
                        </div>
                    </div>
                </div>
                <p className="affiliate-landingpage-error">{error}</p>
                <button type='submit' className='affiliate-landingpage-signup-cta'>Sign up</button>
                <p className='affiliate-landingpage-login-redirect'>Already have an account? <Link to='/affiliate/login'>Login</Link></p>
            </form>
            <div className='affiliate-landingpage-image-container'>
            </div>
        </div >
    )
}

export default Affiliateregistrationform