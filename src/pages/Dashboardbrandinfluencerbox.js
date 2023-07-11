import React from "react";
import Dashboardnav from "../global/Dashboardnav";
import Dashboardheader from "../sections/Dashboardheader";
import Brandinfluencerbox from "../sections/Brandinfluencerbox"
import { useAuthUser } from "react-auth-kit";
import '../styles/pages/Dashboardaffiliateinfluencerhub.css'


function Dashboardbrandinfluencerbox() {

    const auth = useAuthUser()

    return(
        <div className='dashboard-landing-page-container'>
            <Dashboardnav link="Creator Box" Type={auth().user_type}/>
            <div className="dashboard-landing-page-section-container">
            <Dashboardheader title="Creator Box"/>
            <Brandinfluencerbox Type={auth().user_type} Id={auth().id} />
            </div>
        </div>
    )
}

export default Dashboardbrandinfluencerbox