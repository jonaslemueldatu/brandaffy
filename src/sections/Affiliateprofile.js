//accepts the following props: 
//1. User - Email of user we want to get profile of

import React from "react";
import { useState, useEffect } from 'react'
import '../styles/sections/Affiliateprofile.css'
import axios from 'axios'

function Affiliateprofile(props) {

    const [profile, setProfile] = useState("")
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [editview, setEditview] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [myprofile] = useState(props.myprofile)
    const [oldprofile, setOldprofile] = useState("")
    const [newprofile, setNewprofile] = useState("")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ROUTE}/api/global/getprofile`, {
            params: {
                id: props.id
            }
        }).then((res) => {
            setOldprofile(res.data.user_profile.profile_picture)
            setProfile(res.data.user_profile.profile_picture)
            setFirstname(res.data.user_profile.firstname)
            setLastname(res.data.user_profile.lastname)
            setEmail(res.data.user_profile.email)
            setBirthdate(res.data.user_profile.birthdate)
            setProvince(res.data.user_profile.province)
            setCountry(res.data.user_profile.country)
        }).catch(err => alert(err))
    }, [cancel, props.id])

    const handleDiscard = () => {
        setCancel(!cancel)
        setEditview(false)
    }

    const updateAffiliate = (event) => {
        newprofile === "" ? setProfile(oldprofile) : console.log("")
        event.preventDefault()
        const formData = new FormData();
        if (newprofile) {
            formData.append('profile_picture', newprofile);
        }
        formData.append('id', props.id)
        formData.append('birthdate', birthdate)
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('province', province)
        formData.append('country', country)

        axios.post(`${process.env.REACT_APP_ROUTE}/api/affiliate/update`, formData).then((res) => {
            setFirstname(res.data.user_profile.first_name)
            setLastname(res.data.user_profile.last_name)
            setBirthdate(birthdate)
            setProvince(province)
            setCountry(country)
            setEditview(false)
        }).catch(err => console.log(err))
    }

    const handlePhotochange = (e) => {
        setNewprofile(e.target.files[0])
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setProfile(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    return (
        <div className="affiliateprofile-info-container">
            <div className="affiliateprofile-info-block">
                <form onSubmit={updateAffiliate} className='affiliateprofile-landingpage-form-container'>
                    <div className="affiliateprofile-image-container">
                        {editview ? <label htmlFor="affiliateprofile-photo-input"><img alt="user profile" className="affiliateprofile-info-image" src={profile}></img><input hidden id="affiliateprofile-photo-input" className="affiliateprofile-photo-uploader" onChange={(e) => handlePhotochange(e)} type="file"></input></label> : profile && <img alt="user profile" className="affiliateprofile-info-image" src={profile}></img>}
                    </div>
                    <div className="affiliateprofile-info-data">
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
                                {editview ? <input required value={birthdate} onChange={(e) => { setBirthdate(e.target.value) }} type="date"></input> : <div className="affiliateprofile-field-value"> {birthdate} </div>}
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
                            {!editview && myprofile && (<button className="global-button-one" onClick={() => { setEditview(true); setProfile('https://brandaffy.s3.ap-southeast-2.amazonaws.com/website+assets/profile+upload+icon.webp') }} >Edit</button>)}
                            {editview && (<button className="global-button-two" onClick={() => { handleDiscard(); setProfile() }}><span>Cancel</span></button>)}
                            {editview && (<button className="global-button-three" type="submit">Submit</button>)}
                        </div>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Affiliateprofile