import React, { useEffect, useState } from "react";
import '../styles/snippets/SocialloginIG.css'
import { LoginSocialTiktok } from 'reactjs-social-login';
import { TikTokLoginButtonLoginButton } from 'react-social-login-buttons';
import axios from "axios";
import '../styles/snippets/SocialloginTiktok.css'


function SocialloginTiktok() {

    const REDIRECT_URI = 'https://localhost:3001/dashboard/affiliate/profile'
    const [profile, setProfile] = useState({});


    return (
        <div className="sociallogintiktok-container">
            <LoginSocialTiktok
                client_key={process.env.REACT_APP_TIKTOK_CLIENT_KEY}
                redirect_uri={REDIRECT_URI}
                onResolve={({ provider, data }) => {
                    setProfile(data);
                }}
                onReject={(err) => {
                    console.log(err);
                }}
            >
                <div className="content">
                    <div className="icon">
                    </div>
                    <span className="txt">Login With Tiktok</span>
                </div>
            </LoginSocialTiktok>
        </div>
    )
}

export default SocialloginTiktok