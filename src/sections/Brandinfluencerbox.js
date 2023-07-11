import React, { useState } from "react";
import '../styles/sections/Brandinfluencerbox.css'
import { useEffect } from "react";
import axios from 'axios'
import Createboxpopup from "../snippets/Createboxpopup";


function Brandinfluencerbox(props) {

    const [boxpopup, setBoxpopup] = useState(false)
    const [boxlist, setBoxlist] = useState([])
    const [count] = useState(0)
    const [success, setSuccess] = useState()

    const handleTrClick = (id) => {
        console.log(id)
        axios.post(`${process.env.REACT_APP_ROUTE}/api/brand/deletebox`, {
            id: id
        }).then((res) => {
            if (res.status === 200) {
                setSuccess(1)
            }
        }).catch(err => alert(err))
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_ROUTE}/api/brand/getbox`, {
            params: {
                brand_owner_id: props.Id
            }
        }).then((res) => {
            setBoxlist(res.data.brandbox_list)
        }).catch(err => alert(err))
        setSuccess(0)
    }, [boxpopup, props.Id, success])

    return (
        <div className="brandinfluencerbox-main-container">
            <div className="brandinfluencerbox-action-bar">
                <button onClick={() => (setBoxpopup(true))} className="global-button-one">Create Box</button>
            </div>
            <div className="brandinfluencerbox-table-container">
                <table className="brandinfluencerbox-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th><label>LABEL</label></th>
                            <th><label>DESCRIPTION</label></th>
                            <th><label>INFLUENCER COUNT</label></th>
                            <th><label>ACTION</label></th>
                        </tr>
                    </thead>
                    <tbody>
                        {boxlist.map((box) => (
                            <tr key={box._id.toString()} onClick={(e) => (handleTrClick(box._id.toString()))}>
                                <td></td>
                                <td>{box.box_label}</td>
                                <td>{box.box_description}</td>
                                <td>{count}</td>
                                <td><button className="global-button-five">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {boxpopup && <Createboxpopup stateChanger={setBoxpopup} Id={props.Id} />}
        </div>
    )
}

export default Brandinfluencerbox