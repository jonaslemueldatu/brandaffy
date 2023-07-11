import React from "react";
import '../styles/snippets/Createboxpopup.css'
import { useEffect, useState } from "react";
import axios from 'axios'

function Createboxpopup(props) {

    const [click, setClick] = useState(false)
    const [label, setLabel] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e, props) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_ROUTE}/api/brand/createbox`, {
            box_label: label,
            box_description: description,
            brand_owner_id: props.Id
        }).then((res) => {
            if (res.data.err) {
                setError(res.data.err)
            } else if (res.status === 200) {
                console.log(res)
                setClick(!click)
            }
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        if (click) {
            props.stateChanger(false)
        }
    }, [click, props])

    return (
        <div onClick={() => setClick(!click)} className="createbox-container-overlay">
            <div onClick={(e) => (e.stopPropagation())} className="createbox-popup-modal">
                <form onSubmit={(e) => (handleSubmit(e, props))}>
                    <h2 className="dashboardheader-title-text">Create Box</h2>
                    <div className='brand-landingpage-two-fields'>
                        <div className='brand-landingpage-field'>
                            <label htmlFor='brand-register-Label'>LABEL:</label>
                            <input onFocus={() => (setError(""))} onChange={(e) => { setLabel(e.target.value) }} required id='brand-register-Label' type="text" ></input>
                            <div className="createbox-landingpage-error">{error}</div>
                        </div>
                    </div>
                    <div className='brand-landingpage-two-fields'>
                        <div className='brand-landingpage-field'>
                            <label htmlFor='brand-register-description'>DESCRIPTION</label>
                            <textarea onChange={(e) => { setDescription(e.target.value) }} required rows="5" id='brand-register-description' type="text" ></textarea>
                        </div>
                    </div>
                    <div className="createbox-action-container">
                        <button onClick={() => setClick(!click)} className="global-button-two">Cancel</button>
                        <button type="submit" className="global-button-three">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Createboxpopup