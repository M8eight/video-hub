import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../slices/user/userRequests";

export default function UserAdminScreen(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const usersIsLast = useSelector((state) => state.user.usersIsLast);

  const [offset, setOffset] = React.useState(0);
  const [limit] = React.useState(30);

  return (
    <React.Fragment>
      <div>
        <h2 className="text-center">Пользователи</h2>

        <InfiniteScroll
          dataLength={users.length}
          next={ () => {
            dispatch(getUsers({ offset, limit }))
            setOffset(offset + 1);
          }}
          hasMore={!usersIsLast}
          style={{ overflow: "visible" }}
          loader={
              <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div>
              </div>
          }
          endMessage={<h4 className="text-center">Все конец</h4>}
        >
          <div className="row row-cols-1 row-cols-md-3 g-3 overflow-hidden">
            {users.map((user) => (
              <div className="col">
                <div className={"card text-bg-dark"}>
                  <a
                    className="text-decoration-none text-light"
                    href={"/user/" + user.id}
                  >
                    <div className="card-body">
                      <h4 className="card-title">
                        {user.id}: {user.login}{" "}
                        {user.authorities
                          .map((el) => el.name)
                          .includes("ROLE_ADMIN") === true ? (
                          <span className="badge text-bg-primary">Admin</span>
                        ) : (
                          <span className="badge text-bg-secondary">User</span>
                        )}
                      </h4>
                      <p className="card-text">{user.email}</p>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </React.Fragment>
  );
}
