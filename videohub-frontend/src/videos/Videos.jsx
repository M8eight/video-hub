import React from 'react'
import Header from '../components/Header';
import { request } from '../helpers/axios_helper';
import AddVideoCollapse from './AddVideoCollapse';
import { isAuth } from '../helpers/jwt_helper';
import InfiniteScroll from "react-infinite-scroll-component";
import toHHMMSS from '../helpers/toHHMMSS';

import "./videoHome.css";

export default function Videos() {
    const [data, setData] = React.useState([]);
    const [errors, setErrors] = React.useState("visually-hidden");
    const [limit, setLimit] = React.useState(15);
    const [offset, setOffset] = React.useState(0);
    const [sortBy, setSortBy] = React.useState("");
    const IS_AUTH = isAuth();

    React.useEffect(() => {
        updateSort();
    }, [sortBy]);

    const videoRequest = () => {
        return request('get', '/api/videos?offset=' + offset + '&limit=' + limit + '&sortBy=' + sortBy)
    }

    const updateSort = () => {
        setOffset(0);
        videoRequest()
            .then((res) => {
                setData(res.data);
                // setOffset(offset + 1);
                console.log(offset);
            }).catch(err => {
                console.error("Error getVideos")
            })
    }

    const getVideos = () => {
        videoRequest()
            .then((res) => {
                setData(res.data);
                setOffset(offset + 1);
                console.log(offset);
            }).catch(err => {
                console.error("Error getVideos")
            })
    }

    const getMoreVideos = () => {
        videoRequest()
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



    function setSortByValue(value) {
        setSortBy(value);
    }

    function chkSort(currSort, stateSort) {
        if (currSort === stateSort) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <React.Fragment>
            <Header currentTab="videos" />

            <div className={"alert alert-danger w-100 text-center " + errors} role="alert">
                Ошибка загрузки видео
            </div>



            <div id="videos">
                <div className="container-fluid mt-4">


                    <h2 className="text-center">Все видео</h2>

                    {!IS_AUTH && (<div className='fs-3 text-center public-video-text mb-3'>Войдите что бы публиковать видео</div>)}
                    {IS_AUTH && (
                        <React.Fragment>
                            <div class="d-grid gap-2 col-6 my-3 mx-auto">
                                <button type="button" className="btn btn-info" data-bs-toggle="collapse" href="#videoCollapse" aria-expanded="false" aria-controls="videoCollapse">Загрузить видео</button>
                            </div>
                            <div className="col-lg-6 mx-auto">
                                <AddVideoCollapse />
                            </div>
                        </React.Fragment>
                    )}


                    <div className="row ms-2 mb-3">
                        <div class="d-inline-flex gap-1">
                            <button class={"btn btn-" + (chkSort("", sortBy) ? "outline-" : "") + "secondary me-md-2"} type="button" onClick={() => setSortByValue("")}>Новые</button>
                            <button class={"btn btn-" + (chkSort("views", sortBy) ? "outline-" : "") + "secondary"} type="button" onClick={() => setSortByValue("views")}>По просмотрам</button>
                        </div>
                    </div>

                    <div className="row">

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
                                                    <span className="card-body">
                                                        <h6 className="mb-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill me-1 mb-1" viewBox="0 0 16 16">
                                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                            </svg>
                                                            {el.views}
                                                        </h6>
                                                    </span>
                                                    <span className="card-body float-end">
                                                        <h6 className="float-end mb-4">{toHHMMSS(el.duration)}</h6>
                                                    </span>
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
                </div>
            </div>
        </React.Fragment >
    )
}
