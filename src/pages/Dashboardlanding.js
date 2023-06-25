import React from "react";
import { Navigate, useLocation, useNavigate  } from "react-router-dom";

function Dashboardlanding() {
    const location = useLocation();
    let userProfile = location.state;


    return (
        <div>Hello World</div>
    );
}

export default Dashboardlanding