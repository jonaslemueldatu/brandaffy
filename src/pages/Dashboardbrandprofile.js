import React from "react";
import Dashboardnav from "../global/Dashboardnav";
import Brandprofile from "../sections/Brandprofile";
import '../styles/pages/Dashboardaffiliateprofile.css'
import { useAuthUser } from "react-auth-kit";
import Dashboardheader from "../sections/Dashboardheader";
import { useParams } from "react-router-dom";
import { useState} from "react"


function Dashboardbrandprofile(props) {

    const auth = useAuthUser()
    const { id } = useParams();

    const [myprofile] = useState(id? false : true)
    const [link] = useState(id? "" : "My Profile")
    const [getid] = useState(id? id : auth().id)

    return (
        <div className='dashboard-landing-page-container'>
            <Dashboardnav link={link} Type={auth().user_type} />
            <div className="dashboard-landing-page-section-container">
                <Dashboardheader title="Brand Profile" />
                <Brandprofile id={getid} myprofile={myprofile} Type={auth().user_type} />
            </div>
        </div>
    );
}

export default Dashboardbrandprofile