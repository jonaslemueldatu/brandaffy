//accepts the following props: 
//1. Title - Title to be displayed

import react from 'react'
import '../styles/sections/Dashboardheader.css'

function Dashboardheader(props) {
    return (
        <div className="dashboardheader-container">
            <h2 className="dashboardheader-title-text">{props.title}</h2>
        </div>
    );
}

export default Dashboardheader