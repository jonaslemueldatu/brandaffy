import React from 'react';
import { LoginSocialFacebook, LoginSocialInstagram } from 'reactjs-social-login'
import { InstagramLoginButton } from 'react-social-login-buttons'
import { state, useState, useCallback } from 'react'

function Brandlandingpage() {

    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)
    const REDIRECT_URI = "window.location.href";

    const onLoginStart = useCallback(() => {
        alert('login start')
    }, [])

    const onLogoutSuccess = useCallback(() => {
        setProfile(null)
        setProvider('')
        alert('logout success')
    }, [])

    return (
        <>
            <div>Brand Landing Pagess
            <LoginSocialInstagram
            isOnlyGetToken
            client_id={'6342324939180545' || ''}
            client_secret={'97c5aae4b141556dc129320719313aea' || ''}
            redirect_uri={REDIRECT_URI}
            onLoginStart={onLoginStart}
            onResolve={({ provider, data }) => {
              setProvider(provider)
              setProfile(data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <InstagramLoginButton />
          </LoginSocialInstagram>

            </div>
        </>
    )
}

export default Brandlandingpage