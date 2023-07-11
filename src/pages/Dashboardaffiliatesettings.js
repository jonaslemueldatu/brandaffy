import React from "react";
import Dashboardnav from "../global/Dashboardnav";
import { useAuthUser } from "react-auth-kit";
import Dashboardheader from "../sections/Dashboardheader";
import Dashboardplansettings from "../sections/Dashboardplansettings";
import Dashboardsettingssubnav from "../global/Dashboardsettingssubnav"
import '../styles/pages/Dashboardaffiliatesettings.css'
import { useParams } from "react-router-dom";



function Dashboardaffiliatesettings() {

    const auth = useAuthUser()
    const { subsection } = useParams();

    return (
        <div className='dashboard-landing-page-container'>
            <Dashboardnav link="Account Settings" Type={auth().user_type} />
            <div className="dashboard-landing-page-section-container">
                <Dashboardheader title="Account Settings" />
                <div className="dashboard-affiliate-settings-container">
                    <Dashboardsettingssubnav sublink={subsection} />
                    {subsection === 'subscription' && <Dashboardplansettings id={auth().email}/>}
                </div>
            </div>
        </div>
    )
}

export default Dashboardaffiliatesettings