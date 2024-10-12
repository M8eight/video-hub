import { useRef, useEffect, useState, Fragment } from "react";
import { request } from "../../helpers/axios_helper";
import Header from "../../components/Header";

import { useParams } from "react-router-dom";

export default function EditVideo(props) {
    const [videoData, setVideoData] = useState({});
    const [editedVideoData, setEditedVideoData] = useState({});


    const params = useParams()
    const videoRef = useRef();

    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);
    const [imageBlob, setImageBlob] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
                setVideoTags(response.data.tags?.map((el) => el.text));
            })
            .catch(function (error) {
            })
            .finally(function () {
                // выполняется всегда
            })
    }

    function sendEditVideoReq() {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('id', videoData.id);

        formData.append('name', editedVideoData.name);
        formData.append('description', editedVideoData.description);

        formData.append('videoTags', videoTags);

        video !== null && formData.append('videoFile', video);
        image !== null && formData.append('previewDataUrl', image);

        request("put", "http://localhost:8080/api/video/edit", formData, { "Content-Type": "multipart/form-data" })
            .then(function (res) {
                window.location.replace("http://localhost:3000/video/" + videoData?.id);
            })
            .catch(function (err) {
            })
    }

    return (
        <Fragment>
            <Header currentTab="videos" />

            <div className="container">
                <h2 className="text-center my-3">Изменить видео</h2>

                <div className="row p-2">

                    <div className="p-2 col-sm-11 col-md-10 col-lg-8 col-12 mx-auto">
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

                    <div className="col-sm-11 col-md-10 col-lg-9 col-12 mx-auto mb-3">

                        <div className="row">
                            <div className="d-grid gap-2 col-6 my-3 mx-auto" >
                                <button type="button" onClick={() => sendEditVideoReq()} className={"btn btn-info" + (isLoading ? " disabled" : "")} data-bs-toggle="collapse" href="#videoCollapse" aria-expanded="false" aria-controls="videoCollapse">
                                    {isLoading ? <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> : null}{" "}
                                    {isLoading ? "Загрузка..." : "Сохранить"}
                                </button>
                            </div>
                        </div>

                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            <div className="col">
                                <input required type="file" onChange={(e) => setVideo(e.target.files[0])} className="align-middle form-control-lg my-2" name="video" />
                                <button className="btn btn-primary" onClick={getImage}>Сделать из карда превью</button>
                            </div>
                            <div className="col">
                                {image !== null ? <img src={image} alt="" crossOrigin="anonymous" className="img-fluid" /> : null}
                            </div>
                        </div>

                        <hr />

                        <div className="row p-2">
                            <h3>Имя:</h3>
                            {videoData?.name !== undefined ?
                                <input type="text" onChange={(e) => setEditedVideoData({ ...editedVideoData, name: e.target.value })} value={editedVideoData.name} className="form-control-lg form-control convex-button" id="name" defaultValue={videoData.name} />
                                : <p className="placeholder-glow"><span className="placeholder col-8 placeholder-lg"></span></p>
                            }
                        </div>

                        <div className="row p-2">
                            <h3>Описание:</h3>
                            {videoData?.description !== undefined ?
                                <textarea className="form-control form-control-lg convex-button" onChange={(e) => setEditedVideoData({ ...editedVideoData, description: e.target.value })} value={editedVideoData.description} id="exampleFormControlTextarea1" defaultValue={videoData.description} rows="3"></textarea> :
                                <p className="placeholder-glow mb-0"><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span></p>
                            }
                        </div>

                        <hr />

                        <div className="row p-2">
                            <h3>Теги:</h3>
                            <h4 className="overflow-hidden">
                                {videoTags?.map((el) => el !== "" && (
                                    <span key={el} class="badge text-bg-secondary mt-2">{el}</span>
                                ))}
                            </h4>
                            <input type="text" className="form-control form-control-lg mt-2 convex-button" placeholder="Теги видео (через запятую)" defaultValue={videoData.tags?.map((el) => el.text).join(', ')}
                                onChange={(e) => {
                                    setVideoTags(Array.from(e.target.value.split(',').filter((el) => el.trim() !== "").map((el) => el.trim())));
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}