// Props Guide: 
// Link: link of current page
// Type: User type


import React, { useState } from "react";
import '../styles/global/Dashboardnav.css'
import { Link } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useAuthUser } from "react-auth-kit"


function Dashboardnav(props) {

    const auth = useAuthUser()
    const signOut = useSignOut()
    const navigate = useNavigate()

    const [type] = useState(props.Type.toLowerCase())
    const [link] = useState(props.link)
    const [brandlogo] = useState("https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/Brandaffy+Logo.png")

    const handleLogout = async () => {
        axios.post(`${process.env.REACT_APP_ROUTE}/api/${type}/logout`, {
            id: auth().id
        }).then((res) => {
            if (res.status === 200) {
                navigate(`/${type}/login`);
                setTimeout(() => {
                    signOut();
                }, 1000);
            }
        }).catch(err => alert(err))
    };

    const handleLink = (link) => {
        navigate(link)
        navigate(0)
    }

    return (
        <div className="dashboard-nav-section-container">
            <div className="dashboard-nav-header">
                <img alt="Brandaffy logo colored" src={brandlogo}></img>
            </div>
            <div className="dashboard-nav-links">
                {type === 'affiliate' && (
                    <div className="dashboard-affiliate-top-nav">
                        <Link className={link === "My Profile" ? "active" : ""} onClick={() => handleLink('/dashboard/affiliate/profile')}>My Profile</Link>
                        <Link className={link === "Campaigns" ? "active" : ""} onClick={() => handleLink('/dashboard/affiliate/campaigns')}> Campaigns</Link>
                        <Link className={link === "Influencer Hub" ? "active" : ""} onClick={() => handleLink('/dashboard/affiliate/influencerhub')}>Influencer Hub</Link>
                        <hr className="dashboard-affiliate-separator" />
                    </div>
                )}

                {type === 'brand' && (
                    <div className="dashboard-affiliate-top-nav">
                        <Link className={link === "My Profile" ? "active" : ""} onClick={() => handleLink('/dashboard/brand/profile')}>My Profile</Link>
                        <Link className={link === "Campaigns" ? "active" : ""} onClick={() => handleLink('/dashboard/brand/campaigns')}> Campaigns</Link>
                        <Link className={link === "Influencer Hub" ? "active" : ""} onClick={() => handleLink('/dashboard/brand/influencerhub')}>Influencer Hub</Link>
                        <Link className={link === "Creator Box" ? "active" : ""} onClick={() => handleLink('/dashboard/brand/influencerbox')}>Creator Box</Link>
                        <hr className="dashboard-affiliate-separator" />
                    </div>
                )}

                <div className="dashboard-affiliate-bottom-nav">
                    <Link className={link === "Account Settings" ? "active" : ""} onClick={() => handleLink('/dashboard/brand/settings/subscription')}>Account Settings</Link>
                    <Link className={link === "Help Center" ? "active" : ""} onClick={() => handleLink('/')}> Help Center</Link>
                    <div onClick={handleLogout}>Logout </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboardnav;