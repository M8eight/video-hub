import React, { useEffect } from 'react'
import Header from '../components/Header';
import { request } from '../helpers/axios_helper';

import "./userDetails.css";

export default function UserDetails() {
    const [userData, setUserData] = React.useState({});


    function getUser() {
        request("get", "http://localhost:8080/api/user/" + window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1))
            .then(function (res) {
                setUserData(res.data);
            })
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <React.Fragment>
            <Header currentTab="user" />

            <div className='container-fluid'>
                <p className='col-2'>{userData.id}</p>
                <div className='row'>
                    <img className='img-thumbnail col-2' src={userData.avatar_path !== null ? userData.avatar : "http://localhost:8080/media/avatar.png"} alt="Avatar field" />
                    <h2 className='col-2'>{userData.login + " "}
                        <img style={{ height: "20px" }} className='bi bi-0-circle-fill bolt' src={userData.avatar_path !== null ? userData.avatar : "http://localhost:8080/media/gmod.png"} alt="Avatar field" />
                    </h2>
                    <p className='text'>{"{ " + userData.authorities?.map((el) => el.authority) + " }"}</p>
                </div>
            </div>
        </React.Fragment >
    )
}
