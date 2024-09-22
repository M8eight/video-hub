import { useRef, useEffect, useState, Fragment, useMemo } from "react";
import { request } from "../../helpers/axios_helper";
import Header from "../../components/Header";
import CommentsBlock from "../currentVideo/CommentsBlock";
import { isAuth } from "../../helpers/jwt_helper";
import { Stage, Layer, Text } from "react-konva";

import { useParams } from "react-router-dom";


export default function EditVideo(props) {
    const [videoData, setVideoData] = useState({});
    const params = useParams()
    const [video, setVideo] = useState(null);
    const videoRef = useRef();
    const [image, setImage] = useState(null);

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
                setVideoData(response.data)
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
                        <div class="d-grid gap-2 col-6 my-3 mx-auto">
                            <input required type="file" onChange={(e) => setVideo(e.target.files[0])} className="align-middle form-control-lg my-2" name="video" />
                            <button className="btn btn-primary" onClick={getImage}>Сделать из карда превью</button>
                        </div>
                        <div className="col">
                            {image !== null ? <img src={image} alt="" crossOrigin="anonymous" className="img-fluid" /> : null}
                        </div>
                    </div>

                    <div className="row p-2 mt-2">
                        <div className="col-9 text-break fs-4">
                            {videoData?.name !== undefined ?
                                <input type="text" className="form-control-lg form-control" id="name" value={videoData.name} />
                                : <p className="placeholder-glow"><span className="placeholder col-8 placeholder-lg"></span></p>
                            }
                        </div>
                    </div>

                    <hr />

                    <div className="row p-2">
                        {videoData?.description !== undefined ?
                            <textarea className="form-control form-control-lg" id="exampleFormControlTextarea1" value={videoData.description} rows="3"></textarea> :
                            <p className="placeholder-glow mb-0"><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span></p>
                        }
                    </div>
                </div>
            </div>

        </Fragment>
    )
}