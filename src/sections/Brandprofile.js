//accepts the following props: 
//1. User - Email of user we want to get profile of

import React from "react";
import { useState, useEffect } from 'react'
import '../styles/sections/Brandprofile.css'
import axios from 'axios'

function Brandprofile(props) {

    const [profile, setProfile] = useState("")
    const [brandname, setBrandname] = useState("");
    const [email, setEmail] = useState("");
    const [editview, setEditview] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [myprofile] = useState(props.myprofile)
    const [oldprofile, setOldprofile] = useState("")
    const [newprofile, setNewprofile] = useState("")

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ROUTE}/api/brand/getprofile`, {
            params: {
                id: props.id
            }
        }).then((res) => {
            setOldprofile(res.data.user_profile.profile_picture)
            setProfile(res.data.user_profile.profile_picture)
            setBrandname(res.data.user_profile.brandname)
            setEmail(res.data.user_profile.email)
        }).catch(err => alert(err))
    }, [cancel, props.id])

    const handleDiscard = () => {
        setCancel(!cancel)
        setEditview(false)
    }

    const updateBrand = (event) => {
        newprofile === "" ? setProfile(oldprofile) : console.log("")
        event.preventDefault()
        const formData = new FormData();
        if (newprofile) {
            formData.append('profile_picture', newprofile);
        }
        formData.append('id', props.id)
        formData.append('brand_name', brandname)

        axios.post(`${process.env.REACT_APP_ROUTE}/api/brand/update`, formData).then((res) => {
            setBrandname(res.data.user_profile.brand_name)
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
        <div className="brandprofile-info-container">
            <div className="brandprofile-info-block">
                <form onSubmit={updateBrand} className='brandprofile-landingpage-form-container'>
                    <div className="brandprofile-image-container">
                        {editview ? <label htmlFor="brandprofile-photo-input"><img alt="user profile" className="brandprofile-info-image" src={profile}></img><input hidden id="brandprofile-photo-input" className="brandprofile-photo-uploader" onChange={(e) => handlePhotochange(e)} type="file"></input></label> : profile && <img alt="user profile" className="brandprofile-info-image" src={profile}></img>}
                    </div>
                    <div className="brandprofile-info-data">
                        <div className='brand-landingpage-two-fields'>
                            <div className='brand-landingpage-field'>
                                <label htmlFor='brand-register-firstname'>BRAND NAME:</label>
                                {editview ? <input required onChange={(e) => { setBrandname(e.target.value) }} type="text" value={brandname}></input> : <div className="brandprofile-field-value"> {brandname} </div>}
                            </div>
                        </div>
                        <div className='brand-landingpage-two-fields'>
                            <div className='brand-landingpage-field'>
                                <label htmlFor='brand-register-email'>EMAIL:</label>
                                <div className="brandprofile-field-value"> {email} </div>
                            </div>
                        </div>
                        <div className="brandprofile-button-container">
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

export default Brandprofile