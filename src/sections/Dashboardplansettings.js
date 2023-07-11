// props: 
// id: email to be queried to get user plan

import React from 'react'
import '../styles/sections/Dashboardplansettings.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Dashboardplansettings(props) {

    const [userplan, setUserplan] = useState({
        plan: ""
    })
    const [plans] = useState({
        influencer: ['free', 'starter', 'growth'],
        influencer_price: [0, 4.99, 9.99],
        influencer_number_campaigns: [3, 7, 15],
    })

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ROUTE}/api/global/getplansettings`, {
            params: {
                email: props.id
            }
        }).then((res) => {
            setUserplan(res.data.user_plan)
        }).catch(err => alert(err))
    }, [props.id])


    return (
        <div className='plansettings-container'>
            <div className='plansettings-container-title'>Subscription</div>
            <div className='plansettings-container-subscription'>
                <table>
                    <tbody>
                        <tr>
                            <th>
                            </th>
                            {plans.influencer.map((plan, index) => (
                                <th key = { index } className = { userplan.plan.toUpperCase() === plan.toUpperCase() ? "active" : "" } >
                                    <div>{plan}</div>
                                    <div className='plansettings-plan-price'>${plans.influencer_price[index]}</div>
                                    <button className={userplan.plan.toUpperCase() === plan.toUpperCase() ? "active" : ""}> {userplan.plan.toUpperCase() === plan.toUpperCase() ? "Your Plan" : "Change plan"}</button>
                                </th>
                            ))}
                    </tr>
                    <tr>
                        <td>
                            <span>Active campaigns</span>
                        </td>
                        {plans.influencer_number_campaigns.map((campaign, index) => (
                            <td key={index} className={userplan.influencer_active_campaigns === campaign ? "active" : ""}>{campaign} {userplan.influencer_active_campaigns === campaign && <div className='plansettings-plan-left'>{userplan.influencer_active_campaigns_left} left</div>}</td>
                        ))}
                    </tr>
                </tbody>
            </table>

        </div>
        </div >
    )
}

export default Dashboardplansettings