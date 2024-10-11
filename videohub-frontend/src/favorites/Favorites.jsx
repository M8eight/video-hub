import React, { useEffect } from 'react'
import Header from '../components/Header';
import { request } from '../helpers/axios_helper';
import { isAuth } from '../helpers/jwt_helper';
import toHHMMSS from '../helpers/toHHMMSS';
import VideoElements from '../components/VideoElements';

export default function Favorites() {
    const [IS_AUTH] = React.useState(isAuth());

    const [favorites, setFavorites] = React.useState(null);

    useEffect(() => {
        request("get", '/api/favorites/get').then((res) => {
            setFavorites(res.data);
        })
    }, []);

    useEffect(() => {
        console.log(favorites);
    }, [favorites]);

    return (
        <React.Fragment>
            <Header currentTab="favourites" />

            <div className='container mt-4'>

                <h2 className="text-center">Избранное</h2>

                {!IS_AUTH && (
                    <div className='text-center text-bg-danger'>
                        Авторизуйтесь!
                    </div>
                )}

                {IS_AUTH && (
                    <React.Fragment>
                        {favorites !== null && (
                                <VideoElements videos={favorites} />
                        )}
                    </React.Fragment>
                )}

            </div>

        </React.Fragment >
    )
}