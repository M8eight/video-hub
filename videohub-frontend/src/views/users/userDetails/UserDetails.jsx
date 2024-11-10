import React, { useEffect } from "react";
import Header from "../../../components/Header";
import toHHMMSS from "../../../helpers/toHHMMSS";
import UserSettings from "../userSettings/UserSettings";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../slices/user/userRequests";
import { useParams } from "react-router-dom";

import "./UserDetails.css";

export default function UserDetails(props) {
  const [avatar, setAvatar] = React.useState(null);
  const params = useParams()

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUser({userId: params.id}));
  }, []);

  function roleFormat() {
    let roles = user?.authorities?.map((el) => el.authority.substring(5));
    return roles;
  }

  return (
    <React.Fragment>
      <Header currentTab="user" />

      <div className="container-fluid mt-4">

        <UserSettings userData={user} avatar={avatar} />

        {user?.avatar_path !== undefined && (
          <img
            className="center"
            src={
              user?.avatar_path !== null
                ? "http://localhost:8080/avatars/" + user?.avatar_path
                : "/default-avatar.png"
            }
            alt="Avatar field"
          />
        )}

        <div className="container">
          <h2>
            Пользователь: {user?.login}{" "}
            {roleFormat()?.includes("ADMIN") === true ? (
              <img
                style={{ height: "20px" }}
                title="Пользователь является админом"
                className="bi bi-0-circle-fill bolt"
                src={"/gmod.png"}
                alt="Avatar field"
              />
            ) : null}
          </h2>
          {
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {user?.videos?.map((el) => (
                <div key={el.id} className="col">
                  <a href={"http://localhost:3000/video/" + el.id}>
                    <div className="card mb-3 parent">
                      <img
                        className="card-img-top preview"
                        src={"http://localhost:8080/media/" + el.preview_path}
                        alt=""
                      />
                      <span className="card-body">
                        <h6 className="mb-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-eye-fill me-1 mb-1"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                          </svg>
                          {el.views}
                        </h6>
                      </span>
                      <span className="card-body float-end">
                        <h6 className="float-end mb-4">
                          {toHHMMSS(el.duration)}
                        </h6>
                      </span>
                      <div className="card-body p-1">
                        <h6 className="card-title cut-text m-1">{el.name}</h6>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </React.Fragment>
  );
}
