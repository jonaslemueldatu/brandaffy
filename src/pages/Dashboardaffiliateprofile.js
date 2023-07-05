import React from "react";
import Dashboardnav from "../global/Dashboardnav";
import Affiliateprofile from "../sections/Affiliateprofile";
import '../styles/pages/Dashboardaffiliateprofile.css'
import { useAuthUser } from "react-auth-kit";
import Dashboardheader from "../sections/Dashboardheader";

function Dashboardaffiliateprofile() {

    const auth = useAuthUser()

    return (
        <div className='dashboard-landing-page-container'>
            <Dashboardnav />
            <div className="dasboad-landing-page-section-container">
            <Dashboardheader title="Influencer Profile"/>
            <Affiliateprofile user={auth().email} />
            </div>
        </div>
    );
}

export default Dashboardaffiliateprofile