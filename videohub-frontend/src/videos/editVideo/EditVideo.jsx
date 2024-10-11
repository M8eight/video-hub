import { useRef, useEffect, useState, Fragment } from "react";
import { request } from "../../helpers/axios_helper";
import Header from "../../components/Header";

import { useParams } from "react-router-dom";

export default function EditVideo(props) {
    const [videoData, setVideoData] = useState({});
    const params = useParams()
    const videoRef = useRef();

    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);
    const [videoTags, setVideoTags] = useState([]);

    useEffect(() => {
        getCurrentVideo();
    }, []);

    useEffect(() => {
        if (video !== null) {
            const fetchData = async () => {
                await videoRef.current.load();
            }
            fetchData()
        }
    }, [video]);


    function getImage() {
        const canvas = document.createElement("canvas");
        let video = document.createElement("video");
        video = videoRef.current;
        video.crossOrigin = "anonymous";
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);
        canvas.crossOrigin = "anonymous";
        setImage(canvas.toDataURL());
    }


    function getCurrentVideo() {
        request("get", 'http://localhost:8080/api/video/' + params.id)
            .then(function (response) {
                setVideoData(response.data);
            })
            .catch(function (error) {
            })
            .finally(function () {
                // выполняется всегда
            })
    }

    function sendEditVideoReq() {
        const formData = new FormData();
        formData.append('name', videoData.name);
        formData.append('description', videoData.description);
        formData.append('videoFile', video);
        formData.append('previewFile', image);
        request("put", "http://localhost:8080/api/video/" + params.id + "/edit", formData, { "Content-Type": "multipart/form-data" })
            .then(function (response) {
                // window.location.replace("http://localhost:3000/videos");
            })
            .catch(function (error) {
            })
            .finally(function () {
                // выполняется всегда
            })
    }

    return (
        <Fragment>
            <Header currentTab="videos" />

            <div className="container-fluid">
                <div className="row p-2">

                    <div className="col-9 p-2 col-md-12 col-lg-12 col-12">
                        <div className="row">
                            <div className="ratio ratio-16x9">
                                <video crossorigin="anonymous" className="videoPlayer" autoPlay muted controls ref={videoRef} poster={videoData?.preview_path !== undefined ?
                                    "http://localhost:8080/media/" + videoData.preview_path :
                                    "http://localhost:8080/media/video_error.png"} >

                                    {videoData?.video_path !== undefined ? (
                                        <source crossorigin="anonymous" src={video !== null ? URL.createObjectURL(video) : "http://localhost:8080/media/" + videoData.video_path} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
                                    ) : null}
                                </video>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="d-grid gap-2 col-6 my-3 mx-auto">
                            <button type="button" onClick={() => sendEditVideoReq()} className="btn btn-info" data-bs-toggle="collapse" href="#videoCollapse" aria-expanded="false" aria-controls="videoCollapse">Сохранить</button>
                        </div>
                    </div>

                    <div className="row">
                        <div class="gap-2 col-9 my-3">
                            <input required type="file" onChange={(e) => setVideo(e.target.files[0])} className="align-middle form-control-lg my-2" name="video" />
                            <button className="btn btn-primary" onClick={getImage}>Сделать из карда превью</button>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            {image !== null ? <img src={image} alt="" crossOrigin="anonymous" className="img-fluid" /> : null}
                        </div>
                    </div>

                    <div className="row mt-2">
                        <h3>Теги:</h3>
                        <h4 className="overflow-hidden">
                            {videoTags?.map((el) => el !== "" && (
                                <span key={el} class="badge text-bg-secondary mt-2">{el}</span>
                            ))}
                        </h4>
                        <input type="text" className="form-control form-control-lg mt-2 convex-button" placeholder="Теги видео (через запятую)"
                            onChange={(e) => {
                                setVideoTags(Array.from(e.target.value.split(',').filter((el) => el.trim() !== "").map((el) => el.trim())));
                            }}
                        />
                    </div>

                    <div className="row p-2 mt-2">
                        <h3>Имя:</h3>
                        <div className="text-break fs-4">
                            {videoData?.name !== undefined ?
                                <input type="text" onChange={(e) => setVideoData({ ...videoData, name: e.target.value })} className="form-control-lg form-control" id="name" value={videoData.name} />
                                : <p className="placeholder-glow"><span className="placeholder col-8 placeholder-lg"></span></p>
                            }
                        </div>
                    </div>

                    <hr />

                    <div className="row p-2">
                        <h3>Описание:</h3>
                        {videoData?.description !== undefined ?
                            <textarea className="form-control form-control-lg" onChange={(e) => setVideoData({ ...videoData, description: e.target.value })} id="exampleFormControlTextarea1" value={videoData.description} rows="3"></textarea> :
                            <p className="placeholder-glow mb-0"><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span></p>
                        }
                    </div>

                </div>
            </div>
        </Fragment>
    )
}