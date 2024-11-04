import React, { useEffect } from 'react'
import Header from '../../components/Header';
import { request } from '../../helpers/axios_helper';
import VideoElements from '../../components/VideoElements';

export default function Camera() {
    const [videos, setVideos] = React.useState([]);
    const [searchData, setSearchData] = React.useState([]);

    function searchName(name) {
        return request('post', `/api/video/search`, { name: name }).then((res) => {
            setSearchData(res.data.content)
        })
    }

    useEffect(() => {
        setVideos([]);
        searchData.map((el) => {
            request("get", "http://localhost:8080/api/video/" + el.id).then((res) => {
                setVideos(videos.concat(res.data))
            })
        })

    }, [searchData])

    return (
        <React.Fragment>
            <Header currentTab="search" />

            <div className='container mt-4'>

                <h2 className="text-center">
                    Поиск{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                </h2>

                <div className='row mb-3'>
                    <div className=" input-group">
                        <div className="input-group-text" id="btnGroupAddon2">
                            {
                                videos.length > 0 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search-heart" viewBox="0 0 16 16">
                                        <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018" />
                                        <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                                    </svg>
                                )
                            }
                        </div>
                        <input type="text" className="form-control" placeholder="Найди видео" aria-label="Search videos" aria-describedby="btnGroupAddon2" onChange={(e) => searchName(e.target.value)} />
                    </div>
                </div>

                <div className='row'>
                    <VideoElements videos={videos} />
                </div>
            </div>

        </React.Fragment >
    )
}