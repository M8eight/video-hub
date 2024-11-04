import React, { useEffect } from 'react'
import Header from '../../components/Header';
import { isAuth } from '../../helpers/jwt_helper';
import VideoElements from '../../components/VideoElements';

import { getFavorites } from '../../slices/favorite/favoriteRequests';
import { useDispatch, useSelector } from 'react-redux';

export default function Favorites() {
    const dispatch = useDispatch();
    const favorite = useSelector((state) => state.favorite);

    const [IS_AUTH] = React.useState(isAuth());

    useEffect(() => {
        dispatch(getFavorites());
    }, []);

    return (
        <React.Fragment>
            <Header currentTab="favorites" />

            <div className='container-fluid mt-4'>

                <h2 className="text-center">
                    Избранное{" "}
                    <svg style={{color: "Tomato" }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg>
                </h2>

                {!IS_AUTH && (
                    <div className='text-center text-bg-danger'>
                        Авторизуйтесь!
                    </div>
                )}

                {favorite?.favorites.length === 0 && (
                    <div className='text-center text-info'>
                        Нету ничего в избранном :(
                    </div>
                )}

                {IS_AUTH && (
                    <React.Fragment>
                        {favorite.favorites !== null && (
                            <VideoElements videos={favorite.favorites} />
                        )}
                    </React.Fragment>
                )}

            </div>

        </React.Fragment >
    )
}