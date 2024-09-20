import React, { useEffect } from 'react'
import { request } from '../../helpers/axios_helper';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function UserAdminScreen(props) {
    const [users, setUsers] = React.useState([]);
    const [offset, setOffset] = React.useState(0);
    const [limit, setLimit] = React.useState(30);

    function getUsers() {
        request('get', '/api/admin/user/users').then((res) => {
            console.log(res.data.content)
            setUsers(res.data.content)
        })
        setOffset(offset+1)
    }
// todo fix last list
    function getMoreUsers() {
        request('get', '/api/admin/user/users?offset=' + offset + '&limit=' + limit)
            .then((res) => {
                console.warn(res.data?.content)
                setUsers(users.concat(res.data.content));
                setOffset(offset + 1);
                console.log(offset);
            }).catch(err => {
                console.error("Error getUsers " + err)
            })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <React.Fragment>
            <div>
                <h2 className='text-center'>Пользователи</h2>

                <InfiniteScroll
                    dataLength={users.length !== undefined ? users.length : 0}
                    next={getMoreUsers}
                    hasMore={!users.last}
                    style={{ overflow: "visible" }}
                    // loader={
                    //     <div class="d-flex justify-content-center">
                    //         <div class="spinner-border" role="status">
                    //             <span class="visually-hidden">Loading...</span>
                    //         </div>
                    //     </div>
                    // }
                    endMessage={<h4 className='text-center'>Все конец</h4>
                    }
                >
                    <div class="row row-cols-1 row-cols-md-3 g-3 overflow-hidden">

                        {users.map((user) => (


                            <div class="col">
                                <div class={"card text-bg-" + (user.authorities.map((el) => el.name).includes("ROLE_ADMIN") === true ? "light" : "dark")}>
                                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                                    <div class="card-body">
                                        <h4 class="card-title">{user.id} {user.login} {(user.authorities.map((el) => el.name).includes("ROLE_ADMIN") === true ? (
                                            <span class="badge text-bg-primary">Admin</span>
                                        ) : <span class="badge text-bg-secondary">User</span>)}</h4>
                                        <p class="card-text">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </InfiniteScroll>
            </div>

        </React.Fragment >
    );
}