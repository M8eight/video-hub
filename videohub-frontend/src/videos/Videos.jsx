import React from 'react'
import Header from '../components/Header';
import { request } from '../helpers/axios_helper';
import AddVideoModal from './AddVideoModal';
import { isAuth } from '../helpers/jwt_helper';
import InfiniteScroll from "react-infinite-scroll-component";

import "./videoHome.css";


export default function Videos() {
const [data, setData] = React.useState([]);
    const [errors, setErrors] = React.useState("visually-hidden");
    const [limit, setLimit] = React.useState(15);
    const [offset, setOffset] = React.useState(0);
    const IS_AUTH = isAuth();

    React.useEffect(() => {
        getVideos();
    }, []);

    const getVideos = () => {
        request('get', '/api/videos?offset=' + offset + '&limit=' + limit)
            .then((res) => {
                setData(res.data);
                setOffset(offset + 1);
                console.log(offset);
            }).catch(err => {
                console.error("Error getVideos")
            })
    }

    const getMoreVideos = () => {
        request('get', '/api/videos?offset=' + offset + '&limit=' + limit)
            .then((res) => {
                console.warn(res.data?.content)
                let dataObj = data
                dataObj.content = dataObj.content.concat(res.data.content)
                dataObj.last = res.data.last
                setData(dataObj);
                setOffset(offset + 1);
                console.log(offset);
            }).catch(err => {
                console.error("Error getVideos " + err)
            })
    }

    return (
        <React.Fragment>
            <Header currentTab="videos" />

            <div className={"alert alert-danger w-100 text-center " + errors} role="alert">
                Ошибка загрузки видео
            </div>

            <AddVideoModal />

            <div id="videos">
                <h2 className="text-center">Все видео</h2>

                {!IS_AUTH && (<div className='fs-3 text-center public-video-text'>Войдите что бы публиковать видео</div>)}
                {IS_AUTH && (<div className="container">
                    <div className="col"></div>
                    <div className="col ">
                        <button type="button" className="btn btn-warning w-100 mb-3" data-bs-toggle="modal" data-bs-target="#videoModal">Загрузить видео</button>
                    </div>
                    <div className="col"></div>
                </div>)}


                <InfiniteScroll
                    dataLength={data.content?.length !== undefined ? data.content?.length : 0}
                    next={getMoreVideos}
                    hasMore={!data.last}
                    loader={<h4 className='text-center'>Loading...</h4>}
                    endMessage={<h4 className='text-center'>Все конец</h4>}

                >
                    <div className="container-fluid">
                        <div className="row row-cols-1 row-cols-md-5 g-4">
                            {data.content?.map((el) => (
                                <div key={el.id} className="col">
                                    <a href={"http://localhost:3000/video/" + el.id}>
                                        <div className="card mb-3 parent">
                                            <img className="card-img-top preview" src={"http://localhost:8080/media/" + el.preview_path} alt="" />
                                            <div className="card-body p-1">
                                                <h6 className="card-title cut-text m-1">{el.name}</h6>
                                            </div>
                                        </div>
                                    </a>
                                </div >
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>

            </div>
        </React.Fragment >
    )
}
