import React from "react";
import Dashboardnav from "../global/Dashboardnav";
import Affiliateprofile from "../sections/Affiliateprofile";
import '../styles/pages/Dashboardaffiliateprofile.css'
import { useAuthUser } from "react-auth-kit";
import Dashboardheader from "../sections/Dashboardheader";
import { useParams } from "react-router-dom";
import { useState} from "react";
import Affiliatesociallogin from "../sections/Affiliatesociallogin";


function Dashboardaffiliateprofile(props) {

    const auth = useAuthUser()
    const { id } = useParams();

    const [myprofile] = useState(id? false : true)
    const [link] = useState(id? "" : "My Profile")
    const [getid] = useState(id? id : auth().id)

    return (
        <div className='dashboard-landing-page-container'>
            <Dashboardnav link={link} Type={auth().user_type} />
            <div className="dashboard-landing-page-section-container">
                <Dashboardheader title="Influencer Profile" />
                <div>
                <Affiliateprofile id={getid} myprofile={myprofile} />
                <Affiliatesociallogin />
                </div>
            </div>
        </div>
    );
}

export default Dashboardaffiliateprofile