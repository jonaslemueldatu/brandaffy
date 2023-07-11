import React from "react";
import SocialloginIG from "../snippets/SocialloginIG";
import '../styles/sections/Affiliatesociallogin.css'
import SocialloginTiktok from "../snippets/SocialloginTiktok";

function Affiliatesociallogin() {
    return(
        <div className="affiliatesocial-main-container">
            <SocialloginIG />
            <SocialloginTiktok />
        </div>
    )
}

export default Affiliatesociallogin