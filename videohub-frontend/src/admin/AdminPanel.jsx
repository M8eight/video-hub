import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import VideoAdminScreen from "./screens/VideoAdminScreen";
import CommentAdminScreen from "./screens/CommentAdminScreen";
import UserAdminScreen from "./screens/UserAdminScreen";
import ReportAdminScreen from "./screens/reports/ReportAdminScreen";
import { request } from "../helpers/axios_helper";

import "./AdminPanel.css";

export default function Camera() {
  const [userCount, setUserCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    request("get", "/api/admin/count/video").then((res) => {
      setVideoCount(res.data);
    });
    request("get", "/api/admin/count/comment").then((res) => {
      setCommentCount(res.data);
    });
    request("get", "/api/admin/count/user").then((res) => {
      setUserCount(res.data);
    });
  }, []);

  return (
    <React.Fragment>
      <Header currentTab="admin" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-auto bg-dark sticky-top">
            <div className="d-flex flex-sm-column flex-row flex-nowrap bg-dark align-items-center sticky-top">
              <a
                href="/admin"
                className="d-block p-2 link-light text-decoration-none mb-4"
                title=""
                data-bs-toggle="tooltip"
                data-bs-placement="right"
                data-bs-original-title="Icon-only"
              >
                <i className="bi-bootstrap fs-2 ">
                  <img
                    src="/lightning.svg"
                    className="bg-light zap-logo"
                    alt=""
                    width={"32"}
                    height={"32"}
                  />
                </i>
              </a>
              <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                <li className="nav-item">
                  <a
                    href="/admin/users"
                    className="nav-link py-3 px-2 mb-4"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-people-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>
                  </a>
                </li>

                <li className="nav-item ">
                  <a
                    href="/admin/reports"
                    className="nav-link py-3 px-2 mb-4"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-flag-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                    </svg>
                  </a>
                </li>

                <li className="nav-item ">
                  <a
                    href="/admin/videos"
                    className="nav-link py-3 px-2 mb-4 disabled"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-film"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
                    </svg>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="/admin/comments"
                    className="nav-link py-3 px-2 mb-4 disabled"
                    title=""
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    data-bs-original-title="Home"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-chat"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                    </svg>
                  </a>
                </li>
              </ul>
              <div className="dropdown">
                <a
                  href="#/"
                  className="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle"
                  id="dropdownUser3"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi-person-circle h2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-people-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                    </svg>
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm p-3 min-vh-100">
            <div className="container mt-3">
              {window.location.pathname.substring(
                window.location.pathname.lastIndexOf("/") + 1
              ) === "admin" ? (
                <div className="row">
                  <h2 className="text-center">Статистика</h2>

                  <div className="col">
                    <div class="card text-center">
                      <div class="card-header"></div>
                      <div class="card-body">
                        <h4 class="card-title">Всего видео</h4>
                        <h1 class="card-title">{videoCount}</h1>
                      </div>
                      <div class="card-footer text-body-secondary"></div>
                    </div>
                  </div>
                  <div className="col">
                    <div class="card text-center">
                      <div class="card-header"></div>
                      <div class="card-body">
                        <h4 class="card-title">Всего пользователей</h4>
                        <h1 class="card-title">{userCount}</h1>
                      </div>
                      <div class="card-footer text-body-secondary"></div>
                    </div>
                  </div>
                  <div className="col">
                    <div class="card text-center">
                      <div class="card-header"></div>
                      <div class="card-body">
                        <h4 class="card-title">Всего коментариев</h4>
                        <h1 class="card-title">{commentCount}</h1>
                      </div>
                      <div class="card-footer text-body-secondary"></div>
                    </div>
                  </div>
                </div>
              ) : null}
              {window.location.pathname.substring(
                window.location.pathname.lastIndexOf("/") + 1
              ) === "users" ? (
                <UserAdminScreen />
              ) : null}
              {window.location.pathname.substring(
                window.location.pathname.lastIndexOf("/") + 1
              ) === "reports" ? (
                <ReportAdminScreen />
              ) : null}
              {window.location.pathname.substring(
                window.location.pathname.lastIndexOf("/") + 1
              ) === "videos" ? (
                <VideoAdminScreen />
              ) : null}
              {window.location.pathname.substring(
                window.location.pathname.lastIndexOf("/") + 1
              ) === "comments" ? (
                <CommentAdminScreen />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
