//accepts the following props: 
//1. User - Email of user we want to get profile of

import React from "react";
import { useState, useEffect } from 'react'
import '../styles/sections/Affiliateprofile.css'
import axios from 'axios'

function Affiliateprofile(props) {

    const [profile, setProfile] = useState("https://i.stack.imgur.com/34AD2.jpg")
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [editview, setEditview] = useState(false)
    const [cancel, setCancel] = useState(false)

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
    }, [cancel])

    const [newfirstname, setNewfirstname] = useState("");
    const [newlastname, setNewlastname] = useState("");
    const [newbirthdate, setNewbirthdate] = useState("");
    const [newprovince, setNewprovince] = useState("");
    const [newcountry, setNewcountry] = useState("");

    const handleDiscard = (event) => {
        event.preventDefault()
        setCancel(!cancel)
        setEditview(false)
    }

    const updateAffiliate = (event) => {
        event.preventDefault()
        axios.post(`http://localhost:3000/api/affiliate/update`, {
            email: props.user,
            birthdate: birthdate,
            firstname: firstname,
            lastname: lastname,
            province: province,
            country: country
        }).then((res) => {
            setFirstname(firstname)
            setLastname(lastname)
            setBirthdate(birthdate)
            setProvince(province)
            setCountry(country)
            setEditview(false)
        }).catch(err => console.log(err))
    }

    return (
        <div className="affiliateprofile-info-container">
            <div className="affiliateprofile-info-block">
                <div className="affiliateprofile-image-container">
                    <img alt="user profile" className="affiliateprofile-info-image" src={profile}></img>
                </div>
                <div className="affiliateprofile-info-data">
                    <form onSubmit={updateAffiliate} className='affiliateprofile-landingpage-form-container'>
                        <div className='affiliate-landingpage-two-fields'>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-firstname'>FIRST NAME:</label>
                                {editview ? <input required onChange={(e) => { setFirstname(e.target.value) }} type="text" value={firstname}></input> : <div className="affiliateprofile-field-value"> {firstname} </div>}
                            </div>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-lastname'>LAST NAME:</label>
                                {editview ? <input required onChange={(e) => { setLastname(e.target.value) }} type="text" value={lastname}></input> : <div className="affiliateprofile-field-value"> {lastname} </div>}
                            </div>
                        </div>
                        <div className='affiliate-landingpage-two-fields'>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-firstname'>EMAIL:</label>
                                <div className="affiliateprofile-field-value"> {email} </div>
                            </div>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-lastname'>BIRTHDAY:</label>
                                {editview ? <input required onChange={(e) => { setBirthdate(e.target.value) }} type="date"></input> : <div className="affiliateprofile-field-value"> {birthdate} </div>}
                            </div>
                        </div>
                        <div className='affiliate-landingpage-two-fields'>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-firstname'>PROVINCE:</label>
                                {editview ? <input required onChange={(e) => { setProvince(e.target.value) }} type="text" value={province}></input> : <div className="affiliateprofile-field-value"> {province} </div>}
                            </div>
                            <div className='affiliate-landingpage-field'>
                                <label htmlFor='affiliate-register-lastname'>COUNTRY:</label>
                                {editview ? <input required onChange={(e) => { setCountry(e.target.value) }} type="text" value={country}></input> : <div className="affiliateprofile-field-value"> {country} </div>}
                            </div>
                        </div>
                        <div className="affiliateprofile-button-container">
                            {!editview && (<button className="affiliateprofile-button-one" onClick={() => { setEditview(true) }} >Edit</button>)}
                            {editview && (<button className="affiliateprofile-button-two" onClick={handleDiscard}><span>Cancel</span></button>)}
                            {editview && (<button className="affiliateprofile-button-three" type="submit">Submit</button>)}
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Affiliateprofile