import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Dashboardnav from "../global/Dashboardnav";
import '../styles/pages/Dashboardlanding.css'
import { Route, Routes } from "react-router-dom";

function Dashboardlanding() {

    return (
        <div class='dashboard-landing-page-container'>
            <Dashboardnav />
            <Routes>
                <Route path="/dashboard" element={<div>1</div>} />
                <Route path="/2" element={<div>2</div>} />
            </Routes>
        </div>
    );
}

export default Dashboardlanding