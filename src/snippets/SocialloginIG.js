import React, { useEffect, useState } from "react";
import '../styles/snippets/SocialloginIG.css'
import { LoginSocialInstagram } from 'reactjs-social-login';
import { InstagramLoginButton } from 'react-social-login-buttons';
import axios from "axios";


function SocialloginIG() {

    const REDIRECT_URI = 'https://localhost:3001/dashboard/affiliate/profile'
    const [profile, setProfile] = useState({});
    const [longtoken, setLongtoken] = useState({})
    const [username, setUsername] = useState("")
    const [mediaCount, setMediaCount] = useState(0)

    useEffect(() => {
        if (profile.access_token) {
            axios.get(`https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET}&access_token=${profile.access_token}`, {}).then((res) => {
                console.log(res)
                setLongtoken(res.data)
            })
        }
    }, [profile])

    useEffect(() => {
        if (longtoken.access_token) {
            axios.get(`https://graph.instagram.com/v17.0/${profile.user_id}?fields=username,media_count&access_token=${longtoken.access_token}`, {}).then((res) => {
                setUsername(res.data.username)
                setMediaCount(res.data.media_count)
            })
        }
    }, [longtoken, profile.user_id])

    useEffect(() => {
        // if (username != "") {
        //     axios.get(`https://www.instagram.com/${username}`, {}).then((res) => {
        //         console.log(res)
        //     })
        // }
    }, [username])


    return (
        <div className="socialloginig-container">
            <LoginSocialInstagram
                isOnlyGetToken
                client_id={process.env.REACT_APP_INSTAGRAM_CLIENT_ID || ''}
                client_secret={process.env.REACT_APP_INSTAGRAM_CLIENT_SECRET || ''}
                redirect_uri={REDIRECT_URI}
                onResolve={({ data }) => {
                    setProfile(data)
                    console.log(data)
                }}
                onReject={(err) => {
                    console.log(err)
                }}
            >
                <InstagramLoginButton />
            </LoginSocialInstagram>
        </div>
    )
}

export default SocialloginIG