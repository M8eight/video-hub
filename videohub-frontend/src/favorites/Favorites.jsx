import React, { useEffect } from 'react'
import Header from '../components/Header';
import { isAuth } from '../helpers/jwt_helper';
import VideoElements from '../components/VideoElements';

import { getFavorites } from '../slices/favorite/favoriteRequests';
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
            <Header currentTab="favourites" />

            <div className='container-fluid mt-4'>

                <h2 className="text-center">Избранное</h2>

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