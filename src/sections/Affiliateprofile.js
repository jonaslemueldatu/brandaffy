//accepts the following props: 
//1. User - Email of user we want to get profile of

import React from "react";
import { useState, useEffect } from 'react'
import '../styles/sections/Affiliateprofile.css'
import axios from 'axios'
import '../styles/global/Globalvariables.css'

function Affiliateprofile(props) {

    const [profile, setProfile] = useState("https://scontent.fcrk3-1.fna.fbcdn.net/v/t39.30808-6/287825759_2021439201389784_2663061212977595522_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHUOJ5Eto2mDxJzXVLYrCo8TKcasVkT5iFMpxqxWRPmIS40rxjS9EcXcWTf1Fv3BbTrENl_1B-rhwXR01nUZPPa&_nc_ohc=BZh9bqrQ96QAX_lcXHa&_nc_ht=scontent.fcrk3-1.fna&oh=00_AfAJpu-3XXM_bTOKiegLt0umNgTR1a3m8_Fs1uHlXLGrPA&oe=64A96412")
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [editview, setEditview] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/global/getprofile`, {
            params: {
                email: props.user
            }
        }).then((res) => {
            setFirstname(res.data.user_profile.firstname)
            setLastname(res.data.user_profile.lastname)
            setEmail(res.data.user_profile.email)
            setBirthdate(res.data.user_profile.birthdate)
            setProvince(res.data.user_profile.province)
            setCountry(res.data.user_profile.country)
        }).catch(err => alert(err))
    }, [])

    const [newfirstname, setNewfirstname] = useState("");
    const [newlastname, setNewlastname] = useState("");
    const [newbirthdate, setNewbirthdate] = useState("");
    const [newprovince, setNewprovince] = useState("");
    const [newcountry, setNewcountry] = useState("");

    const handleDiscard = (event) => {
        event.preventDefault()
        setEditview(false)
    }

    const updateAffiliate = (event) => {
        event.preventDefault()
        axios.post(`http://localhost:3000/api/affiliate/update`, {
            email: props.user,
            birthdate: newbirthdate,
            firstname: newfirstname,
            lastname: newlastname,
            province: newprovince,
            country: newcountry
        }).then((res) => {
            setFirstname(newfirstname)
            setLastname(newlastname)
            setBirthdate(newbirthdate)
            setProvince(newprovince)
            setCountry(newcountry)
            setEditview(false)
        }).catch(err => console.log(err))
    }

    return (
        <div className="affiliateprofile-info-container">
            <div className="affiliateprofile-info-block">
                <div className="affilaiteprofile-image-container">
                    <img alt="user profile" className="affiliateprofile-info-image" src={profile}></img>
                </div>
                <div className="affiliateprofile-info-data">
                    <form onSubmit={updateAffiliate} className='affiliateprofile-landingpage-form-container'>
                        <div className='affiliate-landingpage-two-fields'>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-firstname'>First Name:</label>
                                {editview ? <input onChange={(e) => { setNewfirstname(e.target.value) }} type="text" placeholder={firstname}></input> : <div className="global-input-field-value"> {firstname} </div>}
                            </div>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-lastname'>Last Name:</label>
                                {editview ? <input onChange={(e) => { setNewlastname(e.target.value) }} type="text" placeholder={lastname}></input> : <div className="global-input-field-value"> {lastname} </div>}
                            </div>
                        </div>
                        <div className='affiliate-landingpage-two-fields'>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-firstname'>Email:</label>
                                <div className="global-input-field-value"> {email} </div>
                            </div>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-lastname'>birthday:</label>
                                {editview ? <input value={birthdate} onChange={(e) => { setNewbirthdate(e.target.value) }} type="date"></input> : <div className="global-input-field-value"> {birthdate} </div>}
                            </div>
                        </div>
                        <div className='affiliate-landingpage-two-fields'>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-firstname'>Province:</label>
                                {editview ? <input onChange={(e) => { setNewprovince(e.target.value) }} type="text" placeholder={province}></input> : <div className="global-input-field-value"> {province} </div>}
                            </div>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-lastname'>Country:</label>
                                {editview ? <input onChange={(e) => { setNewcountry(e.target.value) }} type="text" placeholder={country}></input> : <div className="global-input-field-value"> {country} </div>}
                            </div>
                        </div>
                        <div className="affiliateprofile-button-container">
                            {!editview && (<button className="global-button-one" onClick={() => { setEditview(true) }} >Edit</button>)}
                            {editview && (<button className="global-button-two" onClick={handleDiscard}><span>Cancel</span></button>)}
                            {editview && (<button className="global-button-three" type="submit">Submit</button>)}
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Affiliateprofile