import React from "react";
import '../styles/sections/Affiliateinfluencerhub.css'
import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "react-auth-kit";



function Affiliateinfluencerhub(props) {

    const navigate = useNavigate()
    const auth = useAuthUser()

    const [userlist, setUserlist] = useState([])

    const [type] = useState(props.Type)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ROUTE}/api/global/getaffiliatelist`, {
        }).then((res) => {
            if (res.status === 200) {
                setUserlist(res.data.affiliate_list)
            }
        }).catch(err => alert(err))
    }, [])

    const handleTrClick = (id) => {
        if (id === auth().id.toString()) {
            navigate(`/dashboard/affiliate/profile`)
        } else {
            navigate(`/dashboard/affiliate/profile/${id}`)
        }
    }

    return (
        <div className="affiliateinfluencerhub-info-container">
            <table className="affiliateinfluencerhub-table">
                <thead>
                    <tr>
                        <th></th>
                        <th><label>USER</label></th>
                        <th><label>EMAIL</label></th>
                        <th><label>STATUS</label></th>
                        <th><label>LOCATION</label></th>
                        <th><label>TIKTOK</label></th>
                        <th><label>INSTAGRAM</label></th>
                        <th><label>FACEBOOK</label></th>
                        <th><label>ACTION</label></th>
                    </tr>
                </thead>
                <tbody>
                    {userlist.map((user) => (
                        <tr key={user._id} onClick={() => handleTrClick(user._id.toString())}>
                            <td></td>
                            <td><img alt="user profile icon" src={user.profile_picture}></img><span className="">{user.first_name} {user.last_name}</span></td>
                            <td>{user.email}</td>
                            <td>{user.logged_in ? "Online" : "Away"}</td>
                            <td>{user.province}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{ type === 'Brand' && <button className="global-button-one" >Add</button>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Affiliateinfluencerhub