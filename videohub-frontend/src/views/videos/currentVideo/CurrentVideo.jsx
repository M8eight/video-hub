import React from "react";
import { useEffect, useState, Fragment } from "react";
import Header from "../../../components/Header";
import CommentsBlock from "../helpers/CommentsBlock";
import { isAuth, isAdmin } from "../../../helpers/jwt_helper";
import { formatViews } from "../../../helpers/formatHelper";
import { favoriteValid, favoriteAddRemove } from "../../favorites/favorite_handler";

import { getCurrentVideo, videoRatingUp, videoRatingDown, deleteVideo } from "../../../slices/video/videoRequests";
import { useDispatch, useSelector } from "react-redux";
import ReportCollapse from "./ReportCollapse";

import { useParams } from "react-router-dom";

export default function CurrentVideo(props) {
    const dispatch = useDispatch();
    const video = useSelector((state) => state.currentVideo);
    const videoRef = React.useRef();

    const IS_AUTH = isAuth();
    const [suggestedVideo, setSuggestedVideo] = useState([]);
    const [isFavorite, setFavorite] = useState(null);
    const params = useParams()

    useEffect(() => {
        dispatch(getCurrentVideo(params.id))
        IS_AUTH && favoriteValid(window.location.href.split("/")[window.location.href.split("/").length - 1]).then(res => setFavorite(res.data))
    }, []);

    useEffect(() => {
        videoRef.current.load();
    }, [video])

    return (
        <Fragment>
            <Header currentTab="videos" />

            <div className="container-fluid">
                <div className="row p-2">
                    <div className="col-9 p-2 col-md-12 col-lg-9 col-12">
                        <div className="row">
                            <div className="ratio ratio-16x9">
                                <video ref={videoRef} controls poster={video?.preview_path !== undefined ?
                                    "http://localhost:8080/pictures/" + video.preview_path :
                                    "http://localhost:8080/media/video_error.png"} >

                                    {video?.video_path !== undefined ? (
                                        <source src={"http://localhost:8080/media/" + video.video_path} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
                                    ) : null}
                                </video>
                            </div>
                        </div>

                        <div className="row p-2 mt-2">
                            {isAdmin() && (
                                <div className="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" onClick={() => { dispatch(deleteVideo(video?.id)); window.location.replace("/videos") }} className="btn btn-danger">Удалить видео</button>
                                    <button type="button" onClick={() => { window.location.replace("http://localhost:3000/video/" + video?.id + "/edit") }} className="btn btn-warning">Изменить видео</button>
                                </div>
                            )}

                            <div className="row">
                                <div className="col-9 text-break ">
                                    <span className="fs-4">
                                        {video?.name !== undefined ?
                                            video.name :
                                            <p className="placeholder-glow"><span className="placeholder col-8 placeholder-lg"></span></p>
                                        }
                                    </span>
                                </div>

                                <div className="col m-0 p-0 text-center float-end">
                                    {video?.rating !== undefined ? (
                                        <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                            <button onClick={() => { dispatch(videoRatingUp(video?.id)) }} className="btn bg-success btn-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-heart-eyes-fill me-1" viewBox="0 0 16 16">
                                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.559 5.448a.5.5 0 0 1 .548.736A4.5 4.5 0 0 1 7.965 13a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242s1.46-.118 2.152-.242a27 27 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z" />
                                                </svg>
                                                <span>{video?.rating?.rating_up}</span>
                                            </button>

                                            <button onClick={() => { dispatch(videoRatingDown(video?.id)) }} className="btn bg-danger btn-lg">
                                                <span className="me-1">{video?.rating?.rating_down}</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-angry-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <div className="row p-2">
                                <h5 className="text-secondary">Теги</h5>
                                {video?.tags !== undefined && video?.tags?.length > 0 && (
                                    <div className="fs-5">
                                        {video?.tags.map((el) => <span className="badge rounded-pill bg-primary me-1">{el.text}</span>)}
                                    </div>
                                )}
                            </div>

                            <span className="text-secondary fs-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                </svg>
                                {" "}
                                {video?.views !== undefined ? formatViews(video?.views) : <p className="placeholder-glow"><span className="placeholder col-8 placeholder-lg"></span></p>}
                            </span>
                        </div>
                        <hr />
                        <div className="row p-2">
                            <h5 className="text-secondary">Автор</h5>
                            {video?.user !== null ? (
                                <p>
                                    <span className="me-1">
                                        <a href={"/user/" + video?.user?.id} className="text-decoration-none text-white fs-5">
                                            <img className="rounded-circle shadow-4-strong me-1" style={{ maxHeight: "35px" }} src={video?.user?.avatar_path !== null ? "http://localhost:8080/avatars/" + video?.user?.avatar_path : "/default-avatar.png"} alt="" />
                                            {video?.user?.login}
                                        </a>
                                    </span>
                                </p>
                            ) : "Аноним"}
                        </div>

                        <div className="row p-2">
                            <h5 className="text-secondary">Описание</h5>
                            <div className="col-9">
                                {video?.description !== undefined ?
                                    (
                                        <div>
                                            <p>{video.description}</p>
                                        </div>
                                    ) :
                                    <p className="placeholder-glow mb-0"><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span></p>
                                }
                            </div>
                            <div className="col float-right d-grid mx-auto ">
                                <button className="btn btn-danger mb-2" href="#reportCollapse" data-bs-toggle="collapse" aria-controls="reportCollapse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-flag-fill" viewBox="0 0 16 16">
                                        <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                                    </svg>
                                </button>

                                <button onClick={() => favoriteAddRemove(video?.id, isFavorite).then(res => setFavorite(res.data))} style={{ backgroundColor: "pink", color: "#921A40" }} className="btn">
                                    {isFavorite ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <div className="mt-2">
                                <ReportCollapse />
                            </div>

                        </div>

                        {/* COMMENTS */}
                        {IS_AUTH === true ? (
                            <>
                                <div className="row p-2">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div className="d-flex flex-row align-items-center">
                                            <h3>Кометарии</h3>
                                        </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <button type="button" className="btn btn-info" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Новый кометарий</button>
                                        </div>
                                    </div>
                                </div>
                                <CommentsBlock videoId={params.id} />
                            </>
                        ) : (
                            <div className="alert alert-warning mt-2" role="alert">
                                <h4 className="alert-heading">Войдите, чтобы оставлять комментарии</h4>
                                <p>Вы не авторизованы, пожалуйста, авторизуйтесь <a href="/login">здесь</a></p>
                            </div>
                        )}


                    </div>
                    <div className="col-md-12 col-lg-3 p-1">
                        {suggestedVideo.content?.map((el) => (
                            <a key={el.id} href={'/video/' + el.id}>
                                <div key={el.id} className="card mb-3 parent">
                                    <img className="card-img-top preview" src={"http://localhost:8080/pictures/" + el.preview_path} alt="" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </Fragment>
    )


}
