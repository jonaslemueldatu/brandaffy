import React from "react";
import '../styles/global/Dashboardsettingssubnav.css'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboardsettingssubnav(props) {

    const navigate = useNavigate()

    const[link] = useState(props.sublink)

    const handleLink = (link) => {
        navigate(link)
        navigate(0)
    }

    return(
        <div className="settingssubnav-container">
            <Link className={link === "subscription" ? "active" : ""} onClick={() => handleLink('/dashboard/affiliate/settings/subscription')}>Subscription</Link>
        </div>
    )
}

export default Dashboardsettingssubnav