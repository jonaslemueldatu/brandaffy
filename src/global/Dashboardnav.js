import React from "react";
import '../styles/global/Dashboardnav.css'
import { Route, Routes } from "react-router-dom";


function Dashboardnav() {
    return (
        <div class="dashboard-nav-section-container">
            <a>Profile</a>
            <a>Campaigns</a>
            <a>Influencer Hub</a>


        </div>
    )
}

export default Dashboardnav;