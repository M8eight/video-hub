import React from 'react'
import { removeAuth } from '../helpers/axios_helper';
import { isAuth, getDecodeJwt, isAdmin } from '../helpers/jwt_helper';

import "./header.css";

export default function Header(props) {
    const [IS_AUTH, setIS_AUTH] = React.useState(isAuth());
    const [user, setUser] = React.useState(getDecodeJwt());

    // React.useEffect(() => {
    //     // console.log(user);
    // }, [user]);

    const checkActive = (prop, targetTab) => {
        if (prop === targetTab) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">VideoHub<img src="http://localhost:8080/media/cold.gif" style={{ width: "25px", height: "25px" }} alt="" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={"nav-item " + (checkActive(props.currentTab, "home") ? "active-tab" : "")}>
                            <a className={"nav-link " + (checkActive(props.currentTab, "home") ? "active" : "")} aria-current="page" href="/">Home</a>
                        </li>
                        <li className={"nav-item " + (checkActive(props.currentTab, "videos") ? "active-tab" : "")}>
                            <a className={"nav-link " + (checkActive(props.currentTab, "videos") ? "active" : "")} href="/videos">Videos</a>
                        </li>
                        <li className={"nav-item " + (checkActive(props.currentTab, "search") ? "active-tab" : "")}>
                            <a className={"nav-link " + (checkActive(props.currentTab, "search") ? "active" : "")} href="/search">Найти</a>
                        </li>
                        {isAdmin() === true ? (

                            <li className={"nav-item " + (checkActive(props.currentTab, "admin") ? "active-tab" : "")}>
                                <a className={"nav-link " + (checkActive(props.currentTab, "admin") ? "active" : "")} href="/admin">Админка</a>
                            </li>

                            // <a className={"nav-link " + (checkActive(props.currentTab, "admin") ? "active" : "")} href="/admin">Админка</a>
                        ) : ""
                        }
                    </ul>
                </div>
                <form className="d-flex" role="search">
                    {IS_AUTH && (<a href={'/user/' + user?.id} className={"mx-1 btn btn" + (checkActive(props.currentTab, "user") ? "" : "-outline") + "-light me-1"}>{user?.sub} </a>)}
                    {!IS_AUTH && (<a href='/login' className={"btn btn" + (checkActive(props.currentTab, "login") ? "" : "-outline") + "-primary me-1"} type="submit">Войти</a>)}
                    {!IS_AUTH && (<a href='/register' className={"mx-1 btn btn" + (checkActive(props.currentTab, "register") ? "" : "-outline") + "-success"} type="submit">Регистрация</a>)}
                    {IS_AUTH && (<button onClick={() => removeAuth(setIS_AUTH)} className="btn btn-outline-danger ms-1">Выход</button>)}
                </form>
            </div>
        </nav>
    )
}

