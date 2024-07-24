import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import axios from 'axios';

import AddVideoModal from './AddVideoModal';
import "./videoHome.css";

function VideoHome(params) {
    const [allVids, setAllVids] = useState(null);

    useEffect(() => { getVideos() }, []);

    function getVideos() {
        axios.get('http://localhost:8080/api/videos')
            .then(function (response) {
                let videos = []

                response.data.forEach((k) => {
                    videos[k["id"]] = k
                });

                setAllVids(
                    videos.map((el) => {
                        if (el != null) {
                            return (
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
                            )
                        }
                        else {
                            return "empty";
                        }
                    })
                )

                // console.log(videos);
            })
            .catch(function (error) {
                setAllVids(
                    <div className="alert alert-danger w-100 text-center" role="alert">
                        Ошибка загрузки видео
                    </div>
                )
                // обработка ошибки
                // console.log(error);
            })
            .finally(function () {
                // выполняется всегда
            });
    }


    return (
        <React.Fragment>
            <Header currentTab="videos" />

            <AddVideoModal />


            <div id="videos">
                <h2 className="text-center">Все видео</h2>

                <div className="container">
                    <div className="col"></div>
                    <div className="col ">
                        <button type="button" className="btn btn-warning w-100 mb-3" data-bs-toggle="modal" data-bs-target="#videoModal">Загрузить видео</button>
                    </div>
                    <div className="col"></div>
                </div>

                <div className="container-fluid">
                    <div className="row row-cols-1 row-cols-md-5 g-4">
                        {allVids}
                    </div>
                </div>



            </div>

        </React.Fragment>
    );
}

export default VideoHome;