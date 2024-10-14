import React from "react";
import { removeAuth } from "../helpers/axios_helper";
import { isAuth, getDecodeJwt, isAdmin } from "../helpers/jwt_helper";

import "./header.css";

export default function Header(props) {
  const [IS_AUTH, setIS_AUTH] = React.useState(isAuth());
  const [user] = React.useState(getDecodeJwt());

  function isActive(tab) {
    return props.currentTab === tab;
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          VideoHub
          <img
            src={"http://localhost:8080/static-media/cold.gif"}
            style={{ width: "25px", height: "25px" }}
            alt="ICO"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li
              className={"nav-item " + (isActive("home") ? "active-tab" : "")}
            >
              <a
                className={"nav-link " + (isActive("home") ? "active" : "")}
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            <li
              className={"nav-item " + (isActive("videos") ? "active-tab" : "")}
            >
              <a
                className={"nav-link " + (isActive("videos") ? "active" : "")}
                href="/videos"
              >
                Videos
              </a>
            </li>
            <li
              className={"nav-item " + (isActive("search") ? "active-tab" : "")}
            >
              <a
                className={"nav-link " + (isActive("search") ? "active" : "")}
                href="/search"
              >
                Найти
              </a>
            </li>

            {IS_AUTH && (
              <li
                className={
                  "nav-item " + (isActive("favorites") ? "active-tab" : "")
                }
              >
                <a
                  className={
                    "nav-link " + (isActive("favorites") ? "active" : "")
                  }
                  href="/favorites"
                >
                  Избранное
                </a>
              </li>
            )}

            {isAdmin() ? (
              <li
                className={
                  "nav-item " + (isActive("admin") ? "active-tab" : "")
                }
              >
                <a
                  className={"nav-link " + (isActive("admin") ? "active" : "")}
                  href="/admin"
                >
                  Админка
                </a>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <form className="d-flex" role="search">
          {IS_AUTH && (
            <a
              href={"/user/" + user?.id}
              className={
                "mx-1 btn btn" +
                (!isActive("user") ? "-outline" : "") +
                "-light me-1"
              }
            >
              {user?.sub}{" "}
            </a>
          )}
          {!IS_AUTH && (
            <React.Fragment>
              <a
                href="/login"
                className={
                  "btn btn" +
                  (!isActive("login") ? "-outline" : "") +
                  "-primary me-1"
                }
                type="submit"
              >
                Войти
              </a>
              <a
                href="/register"
                className={
                  "mx-1 btn btn" +
                  (!isActive("register") ? "-outline" : "") +
                  "-success"
                }
                type="submit"
              >
                Регистрация
              </a>
            </React.Fragment>
          )}
          {IS_AUTH && (
            <button
              onClick={() => removeAuth(setIS_AUTH)}
              className="btn btn-outline-danger ms-1"
            >
              Выход
            </button>
          )}
        </form>
      </div>
    </nav>
  );
}
