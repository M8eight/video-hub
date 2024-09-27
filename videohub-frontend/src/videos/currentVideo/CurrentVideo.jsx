import { useEffect, useState, Fragment } from "react";
import { request } from "../../helpers/axios_helper";
import Header from "../../components/Header";
import CommentsBlock from "../helpers/CommentsBlock";
import { isAuth, isAdmin } from "../../helpers/jwt_helper";

import { useParams } from "react-router-dom";


export default function CurrentVideo(props) {
    const IS_AUTH = isAuth();
    const [videoData, setVideoData] = useState({});
    const [rating, setRating] = useState({});
    const [suggestedVideo, setSuggestedVideo] = useState([]);
    const params = useParams()

    useEffect(() => {
        console.log(params.id)
        getCurrentVideo();
        getSuggestedVideos();
    }, []);

    function getSuggestedVideos() {
        request('get', '/api/videos?offset=' + 0 + '&limit=' + 5).then((res) => {
            setSuggestedVideo(res.data)
        })
    }

    function getCurrentVideo() {
        request("get", 'http://localhost:8080/api/video/' + params.id)
            .then(function (response) {
                setVideoData(response.data)
                setRating(response.data.rating)
            })
            .catch(function (error) {
            })
            .finally(function () {
                // выполняется всегда
            })
    }

    function rateUp() {
        request("post", "http://localhost:8080/api/rating/" + videoData?.id + "/up").then((response) => {
            setRating(response.data);
        })
    }

    function rateDown() {
        request("post", "http://localhost:8080/api/rating/" + videoData?.id + "/down").then((response) => {
            setRating(response.data);
        })
    }

    function deleteVideo() {
        request("delete", "http://localhost:8080/api/video/" + videoData?.id).then((response) => {
            window.location.replace("http://localhost:3000/videos");
        })
    }

    return (
        <Fragment>
            <Header currentTab="videos" />

            <div className="container-fluid">
                <div className="row p-2">
                    <div className="col-9 p-2 col-md-12 col-lg-9 col-12">
                        <div className="row">
                            <div className="ratio ratio-16x9">
                                <video controls poster={videoData?.preview_path !== undefined ?
                                    "http://localhost:8080/media/" + videoData.preview_path :
                                    "http://localhost:8080/media/video_error.png"} >

                                    {videoData?.video_path !== undefined ? (
                                        <source src={"http://localhost:8080/media/" + videoData.video_path} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
                                    ) : null}
                                </video>
                            </div>
                        </div>

                        <div className="row p-2 mt-2">
                            {isAdmin() && (
                                <div className="btn-group mb-3" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" onClick={() => { deleteVideo() }} className="btn btn-danger">Удалить видео</button>
                                    <button type="button" onClick={() => { window.location.replace("http://localhost:3000/video/" + videoData?.id + "/edit") }} className="btn btn-warning">Изменить видео</button>
                                    {/* {"route" + params.id} */}
                                </div>
                            )}
                            <div className="col-9 text-break fs-4">
                                {videoData?.name !== undefined ?
                                    videoData.name :
                                    <p className="placeholder-glow"><span className="placeholder col-8 placeholder-lg"></span></p>
                                }
                                <br />
                                {videoData.tags !== undefined && videoData.tags.length > 0 && (
                                    <div>
                                        <b>Теги:</b> {videoData?.tags.map((el) => <span className="badge rounded-pill bg-primary me-1">{el.text}</span>)}
                                    </div>
                                )}
                            </div>
                            <div className="col m-0 p-0 text-center">
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button onClick={rateUp} className="btn bg-success btn-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-heart-eyes-fill me-1" viewBox="0 0 16 16">
                                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.559 5.448a.5.5 0 0 1 .548.736A4.5 4.5 0 0 1 7.965 13a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242s1.46-.118 2.152-.242a27 27 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z" />
                                        </svg>
                                        <span>{rating?.rating_up}</span>
                                    </button>
                                    <button onClick={rateDown} className="btn bg-danger btn-lg">
                                        <span className="me-1">{rating?.rating_down}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-angry-fill" viewBox="0 0 16 16">
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row ms-2">
                            <p><span className="me-1">Автор:</span>
                                <img className="rounded-circle shadow-4-strong me-1" style={{ maxHeight: "35px" }} src={videoData?.user?.avatar_path !== null ? videoData?.user?.avatar : "http://localhost:8080/media/avatar.png"} alt="" />
                                {videoData?.user !== null ? videoData?.user?.login : "Аноним"}
                            </p>
                        </div>
                        <div className="row p-2">
                            {videoData?.description !== undefined ?
                                <p>{videoData.description}</p> :
                                <p className="placeholder-glow mb-0"><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span></p>
                            }
                        </div>
                        {IS_AUTH === true ? (
                            <div className="row p-2">
                                <div className="d-flex justify-content-between mb-2">
                                    <div className="d-flex flex-row align-items-center">
                                        <h3>Комменты</h3>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                        <button type="button" className="btn btn-info" data-bs-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Новый кометарий</button>
                                    </div>
                                </div>

                                <CommentsBlock />
                            </div>
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
                                    <img className="card-img-top preview" src={"http://localhost:8080/media/" + el.preview_path} alt="" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

        </Fragment>
    )


}