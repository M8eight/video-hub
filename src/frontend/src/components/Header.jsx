import React from 'react'

import "./header.css";

export default class Header extends React.Component {
    checkActive(prop, targetTab) {
        if (prop === targetTab) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">VideoHub</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className={"nav-item " + (this.checkActive(this.props.currentTab, "home") ? "active-tab" : "")}>
                                <a className={"nav-link " + (this.checkActive(this.props.currentTab, "home") ? "active" : "")} aria-current="page" href="/">Home</a>
                            </li>
                            <li className={"nav-item " + (this.checkActive(this.props.currentTab, "videos") ? "active-tab" : "")}>
                                <a className={"nav-link " + (this.checkActive(this.props.currentTab, "videos") ? "active" : "")} href="/videos">Videos</a>
                            </li>
                        </ul>
                    </div>
                    <form class="d-flex" role="search">
                        <a href='/login' class={"btn btn" + (this.checkActive(this.props.currentTab, "login") ? "" : "-outline") + "-primary me-2"} type="submit">Войти</a>
                        <a href='/register' class={"btn btn" + (this.checkActive(this.props.currentTab, "register") ? "" : "-outline") + "-success"} type="submit">Регистрация</a>
                    </form>
                </div>
            </nav>
        )
    }
}
