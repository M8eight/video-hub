import React, { useEffect } from 'react'
import Header from '../../components/Header';
import { request } from '../../helpers/axios_helper';
// import { getUserId } from '../helpers/jwt_helper';
import toHHMMSS from '../../helpers/toHHMMSS';
// import { useForm, useWatch, wa } from "react-hook-form";
import UserSettings from '../userSettings/UserSettings';

import "./UserDetails.css";

export default function UserDetails() {
    const [userData, setUserData] = React.useState({});
    const [avatar, setAvatar] = React.useState(null);
    // const [isCurrentUser, setIsCurrentUser] = React.useState(getUserId() === userData.id);


    function getUser() {
        request("get", "http://localhost:8080/api/user/" + window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1))
            .then(function (res) {
                setUserData(res.data);
            })
    }

    useEffect(() => {
        getUser();
        // console.log(userData)
        // console.log(getUserId())
        // console.log(userData.id)
    }, [])

    // function isCurrentUser(params) {

    // }

    function roleFormat() {
        let roles = userData.authorities?.map((el) => el.authority.substring(5))
        return roles
    }



    return (
        <React.Fragment>
            <Header currentTab="user" />
            <div className='container-fluid mt-4'>

                <UserSettings userData={userData} avatar={avatar} />

                <img className='center' src={userData.avatar_path !== null ? "http://localhost:8080/avatars/" + userData.avatar_path : "http://localhost:8080/static-media/avatar.png"} alt="Avatar field" />

                <div className="container">
                    <h2>Пользователь: {userData.login} {roleFormat()?.includes("ADMIN") === true ? (
                        <img style={{ height: "20px" }} title='Пользователь является админом' className='bi bi-0-circle-fill bolt' src={"http://localhost:8080/static-media/gmod.png"} alt="Avatar field" />
                    ) : null
                    }</h2>
                    {
                        <div className="row row-cols-1 row-cols-md-5 g-4">
                            {userData.videos?.map((el) => (
                                <div key={el.id} className="col">
                                    <a href={"http://localhost:3000/video/" + el.id}>
                                        <div className="card mb-3 parent">
                                            <img className="card-img-top preview" src={"http://localhost:8080/media/" + el.preview_path} alt="" />
                                            <span className="card-body">
                                                <h6 className="mb-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill me-1 mb-1" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                    </svg>
                                                    {el.views}
                                                </h6>
                                            </span>
                                            <span className="card-body float-end">
                                                <h6 className="float-end mb-4">{toHHMMSS(el.duration)}</h6>
                                            </span>
                                            <div className="card-body p-1">
                                                <h6 className="card-title cut-text m-1">{el.name}</h6>
                                            </div>
                                        </div>
                                    </a>
                                </div >
                            ))}
                        </div>
                    }
                </div>
            </div>
        </React.Fragment >
    )
}
