import React from "react";
import Dashboardnav from "../global/Dashboardnav";
import { useAuthUser } from "react-auth-kit";
import Dashboardheader from "../sections/Dashboardheader";
import Affiliateinfluencerhub from "../sections/Affiliateinfluencerhub";
import '../styles/pages/Dashboardaffiliateinfluencerhub.css'

function Dashboardbrandinfluencerhub() {

    const auth = useAuthUser()

    return (
        <div className='dashboard-landing-page-container'>
            <Dashboardnav link="Influencer Hub" Type={auth().user_type}/>
            <div className="dashboard-landing-page-section-container">
            <Dashboardheader title="Influencer Hub"/>
            <Affiliateinfluencerhub Type={auth().user_type} />
            </div>
        </div>
    );
}

export default Dashboardbrandinfluencerhub