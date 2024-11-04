import React, { useEffect } from "react";
import { request } from "../../../helpers/axios_helper";
import InfiniteScroll from "react-infinite-scroll-component";

export default function UserAdminScreen(props) {
  const [users, setUsers] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(30);

  function getUsers() {
    request("get", "/api/admin/user/users").then((res) => {
      setUsers(res.data.content);
    });
    setOffset(offset + 1);
  }
  // todo fix last list
  function getMoreUsers() {
    request("get", "/api/admin/user/users?offset=" + offset + "&limit=" + limit)
      .then((res) => {
        console.warn(res.data?.content);
        setUsers(users.concat(res.data.content));
        setOffset(offset + 1);
      })
      .catch((err) => {
        console.error("Error getUsers " + err);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <React.Fragment>
      <div>
        <h2 className="text-center">Пользователи</h2>

        <InfiniteScroll
          dataLength={users.length !== undefined ? users.length : 0}
          next={getMoreUsers}
          hasMore={!users.last}
          style={{ overflow: "visible" }}
          // loader={
          //     <div className="d-flex justify-content-center">
          //         <div className="spinner-border" role="status">
          //             <span className="visually-hidden">Loading...</span>
          //         </div>
          //     </div>
          // }
          endMessage={<h4 className="text-center">Все конец</h4>}
        >
          <div className="row row-cols-1 row-cols-md-3 g-3 overflow-hidden">
            {users.map((user) => (
              <div className="col">
                <div className={"card text-bg-dark"}>
                  {/* <img src="..." className="card-img-top" alt="..." /> */}
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
