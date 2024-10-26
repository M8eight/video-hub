import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Header from '../../components/Header';
import { request } from '../../helpers/axios_helper';
import { isAuth } from '../../helpers/jwt_helper';
import toHHMMSS from '../../helpers/toHHMMSS';
import AddVideoCollapse from '../helpers/AddVideoCollapse';
import VideoElements from '../../components/VideoElements';
import { useDispatch } from 'react-redux';
import { getVideos, getTags, getMoreVideos } from '../../slices/video/videoRequests';
import { useSelector } from 'react-redux';

import "./Videos.css";


export default function Videos() {

    const dispatch = useDispatch();
    const video = useSelector(state => state.video);
    const tags = video.tags;

    const [limit, setLimit] = React.useState(20);
    const [offset, setOffset] = React.useState(0);
    const [sortBy, setSortBy] = React.useState("new");

    const [sortTags, setSortTags] = React.useState([]);
    const tagLimit = 50;
    const tagOffset = 0;

    const IS_AUTH = isAuth();

    React.useEffect(() => {
        dispatch(getVideos({
            offset,
            limit,
            sortBy,
            tags: sortTags
        }));
        dispatch(getTags({
            offset: tagOffset,
            limit: tagLimit
        }));
    }, [])

    React.useEffect(() => {
        dispatch(getVideos({
            offset,
            limit,
            sortBy,
            tags: sortTags
        }));
    }, [sortBy, sortTags]);

    const addToFilter = (tagText) => {
        if (sortTags.includes(tagText)) {
            setSortTags(sortTags.filter(e => e !== tagText))
        } else {
            setSortTags([...new Set(sortTags.concat(tagText))])
        }
    }

    return (
        <React.Fragment>
            <div id="videos">
                <Header currentTab="videos" />

                {video.error && (
                    <div className={"alert alert-danger w-100 text-center " + video.error} role="alert">
                        Ошибка загрузки видео
                    </div>
                )}

                <div className="container-fluid mt-4">
                    <h2 className="text-center">Все видео</h2>
                    {!IS_AUTH && (<div className='fs-3 text-center public-video-text mb-3'>Войдите что бы публиковать видео</div>)}
                    {IS_AUTH && (
                        <React.Fragment>
                            <div className="d-grid gap-2 col-6 my-3 mx-auto">
                                <button type="button" className="btn btn-info" data-bs-toggle="collapse" href="#videoCollapse" aria-expanded="false" aria-controls="videoCollapse">Загрузить видео</button>
                            </div>
                            <div className="col-lg-6 mx-auto">
                                <AddVideoCollapse />
                            </div>
                        </React.Fragment>
                    )}

                    <div className="row ms-3 my-3">
                        <div className="col-12">
                            <h4>По тегам:</h4>
                            {tags.length > 0 ? (
                                <div>
                                    {tags.map((tag) => (
                                        <button className={"btn btn-sm " + (sortTags.includes(tag.text) ? "btn-info" : "btn-outline-secondary text-white") + " m-1"} onClick={() => addToFilter(tag.text)}>{tag.text}</button>
                                    ))}

                                </div>
                            ) : null}

                            {sortTags.map((tag) => (
                                <span>{tag.text}</span>
                            ))}
                        </div>
                    </div>

                    <div className="row ms-3 my-3">
                        <div className="col-12">
                            <h4>Сортировка:</h4>
                            <div className="d-inline-flex gap-2 mb-2">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button onClick={() => setSortBy("new")} type="button" className={"btn " + (sortBy === "new" ? "btn-secondary" : "btn-outline-secondary") + " btn-lg"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-up-square align-" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                            <path d="M3.544 10.705A.5.5 0 0 0 4 11h8a.5.5 0 0 0 .374-.832l-4-4.5a.5.5 0 0 0-.748 0l-4 4.5a.5.5 0 0 0-.082.537" />
                                        </svg>
                                        {" "}С новых
                                    </button>
                                    <button onClick={() => setSortBy("old")} type="button" className={"btn " + (sortBy === "old" ? "btn-secondary" : "btn-outline-secondary") + " btn-lg"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-square" viewBox="0 0 16 16">
                                            <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0z" />
                                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
                                        </svg>
                                        {" "}Старые

                                    </button>
                                    <button onClick={() => setSortBy("views")} type="button" className={"btn " + (sortBy === "views" ? "btn-secondary" : "btn-outline-secondary") + " btn-lg"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        </svg>
                                        {" "}По просмотрам

                                    </button>
                                    <button onClick={() => setSortBy("rating")} type="button" className={"btn " + (sortBy === "rating" ? "btn-secondary" : "btn-outline-secondary") + " btn-lg"}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-heart-eyes" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="M11.315 10.014a.5.5 0 0 1 .548.736A4.5 4.5 0 0 1 7.965 13a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242s1.46-.118 2.152-.242a27 27 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.488 0c1.398-.864 3.544 1.838-.952 3.434-3.067-3.554.19-4.858.952-3.434" />
                                        </svg>
                                        {" "}По рейтингу

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row col-12">
                        <InfiniteScroll
                            dataLength={video.videos.length ?? 0}
                            next={ () => {
                                dispatch(getMoreVideos({
                                    offset: offset + 1,
                                    limit,
                                    sortBy,
                                    tags: sortTags
                                }));
                                setOffset(offset + 1);
                            }}
                            hasMore={!video.last}
                        >
                            <div className="container-fluid">
                                <VideoElements videos={video.videos} />
                            </div>
                        </InfiniteScroll>
                    </div>

                </div>
            </div>
        </React.Fragment >
    )
}
