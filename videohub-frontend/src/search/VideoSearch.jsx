import React, { useEffect } from 'react'
import Header from '../components/Header';
import { request } from '../helpers/axios_helper';

export default function Camera() {
    const [torch, setTorch] = React.useState(false);

    useEffect(() => {

    }, [])


    return (
        <React.Fragment>
            <Header currentTab="search" />

            <div>
                Поиск
            </div>
            
        </React.Fragment >
    )
}