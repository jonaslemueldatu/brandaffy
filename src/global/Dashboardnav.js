import React, { Profiler } from "react";
import '../styles/global/Dashboardnav.css'
import { Link, Route, Routes } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useAuthUser } from "react-auth-kit"


function Dashboardnav() {

    const auth = useAuthUser()

    const signOut = useSignOut()
    const navigate = useNavigate()

    const handleLogout = async () => {
        axios.post(`http://localhost:3000/api/affiliate/logout`, {
            email: auth().email
        }).then((res) => {
            if (res.status == 200) {
                navigate("/affiliate/login");
                setTimeout(() => {
                    signOut();
                }, 1000);
            }
        }).catch(err => alert(err))
    };

    return (
        <div className="dashboard-nav-section-container">
            <Link to={'/dashboard/affiliate/profile'}>Profile</Link>
            <Link to={'/dashboard/affiliate/campaigns'}> Campaigns</Link>
            <Link to={'/dashboard/affiliate/infuencerhub'}>Influencer Hub</Link>
            <button onClick={handleLogout}>Sign out </button>
        </div>
    )
}

export default Dashboardnav;