import React, { useState, useEffect } from "react";
import Header from './../../components/Header'
import axios from 'axios';
import "./currentVideo.css";

function CurrentVideo(params) {
    let idPath = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)

    const [suggests, setSuggests] = useState(null);
    const [currVid, setCurrVid] = useState({
        id: idPath,
        name: <p className="placeholder-glow"><span className="placeholder col-8 placeholder-lg"></span></p>,
        description: <p className="placeholder-glow mb-0"><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span><span className="placeholder col-8 placeholder-sm"></span></p>,
        duration: 0,
        preview_path: "",
        video_path: "",
        updated_at: "",
        err: ""
    });

    useEffect(() => {
        getCurrentVideo()
        getSuggests()
    }, []);

    function getCurrentVideo() {
        axios.get('http://localhost:8080/api/video/' + window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1))
            .then(function (response) {
                setCurrVid({
                    id: idPath,
                    name: <h2>{response.data.name}</h2>,
                    description: <p className="description-vid">{response.data.description}</p>,
                    duration: 0,
                    preview_path: response.data.preview_path,
                    video_path: response.data.video_path,
                    updated_at: "",
                    err: ""
                })
            })
            .catch(function (error) {
                setCurrVid({
                    err: <div className="alert alert-danger w-100 text-center" role="alert">Ошибка загрузки видео</div>
                })
            })
            .finally(function () {
                // выполняется всегда
            });
    }

    function getSuggests() {
        axios.get('http://localhost:8080/api/videos')
            .then(function (response) {
                let videos = []

                response.data.forEach((k) => {
                    videos[k["id"]] = k
                });

                setSuggests(
                    videos.map((el) => {
                        if (el != null) {
                            return (
                                <a key={el.id} href={"http://localhost:3000/video/" + el.id}>
                                    <div  className="card mb-3 parent">
                                        <img className="card-img-top preview ratio ratio-16x9" src={"http://localhost:8080/media/" + el.preview_path} alt="" />
                                        <div className="card-body p-1">
                                            <h6 className="card-title cut-text m-1">{el.name}</h6>
                                        </div>
                                    </div>
                                </a>
                            )
                            
{/*                             <div key={el.id} className="col">
                                    <a href={"http://localhost:3000/video/" + el.id}>
                                        <div className="card mb-3 parent">
                                            <img className="card-img-top preview" src={"http://localhost:8080/media/" + el.preview_path} alt="" />
                                            <div className="card-body p-1">
                                                <h6 className="card-title cut-text m-1">{el.name}</h6>
                                            </div>
                                        </div>
                                    </a>
                                </div > */}

                                // <div key={el.id} className="col">
                                //     <a href={"http://localhost:3000/video/" + el.id}>
                                //         <div className="card mb-3 parent">
                                //             <img className="card-img-top preview" src={"http://localhost:8080/media/" + el.preview_path} alt="" />
                                //             <div className="card-body p-1">
                                //                 <h6 className="card-title cut-text m-1">{el.name}</h6>
                                //             </div>
                                //         </div>
                                //     </a>
                                // </div >
                        }
                        else {
                    return "empty";
                }
                    })
                )

    // console.log(videos);
})
            .catch (function (error) {
    // console.log(error);
})
            .finally(function () {
    // выполняется всегда
});
    }


return (
    <React.Fragment>
        <Header currentTab="videos" />

        <div className="container-fluid">
            {currVid.err}
            <div className="row p-2">
                <div className="col-9 p-2 col-md-12 col-lg-9">
                    <div className="row">
                        <div className="ratio ratio-16x9">
                            <video controls autoPlay poster={"http://localhost:8080/media/" + currVid.preview_path} key={currVid.video_path} >
                                <source src={"http://localhost:8080/media/" + currVid.video_path} type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"' />
                            </video>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="col-9">
                            {currVid.name}
                        </div>
                        <div className="col m-0 p-0 text-center">
                            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                <a href="#/" className="btn bg-success btn-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-heart-eyes-fill me-1" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434m6.559 5.448a.5.5 0 0 1 .548.736A4.5 4.5 0 0 1 7.965 13a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242s1.46-.118 2.152-.242a27 27 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z" />
                                    </svg>
                                    <span>0</span>
                                </a>
                                <a href="#/" className="btn bg-danger btn-lg">
                                    <span className="me-1">0</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-angry-fill" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.053 4.276a.5.5 0 0 1 .67-.223l2 1a.5.5 0 0 1 .166.76c.071.206.111.44.111.687C7 7.328 6.552 8 6 8s-1-.672-1-1.5c0-.408.109-.778.285-1.049l-1.009-.504a.5.5 0 0 1-.223-.67zm.232 8.157a.5.5 0 0 1-.183-.683A4.5 4.5 0 0 1 8 9.5a4.5 4.5 0 0 1 3.898 2.25.5.5 0 1 1-.866.5A3.5 3.5 0 0 0 8 10.5a3.5 3.5 0 0 0-3.032 1.75.5.5 0 0 1-.683.183M10 8c-.552 0-1-.672-1-1.5 0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row p-2 fs-5">
                        {currVid.description}
                    </div>
                    <div className="row p-2">
                        <h3>Комменты</h3>
                    </div>

                </div>
                <div className="col-md- col-lg-3 p-1">
                    {suggests}
                </div>

            </div>

        </div>




        {/* <div className="container-fluid">
                <div className="row">
                    <div class="col-lg-8 video-player">{currVid}</div>
                    <div class="col-lg-4 video-list"><img src="http://localhost:8080/media/48148b72-bb82-47c9-bfe0-2ddb8f6a9a30.png" alt="" /></div>
                </div>
            </div> */}
    </React.Fragment>
);
}

export default CurrentVideo;