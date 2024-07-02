import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import "./videoHome.css";
import axios from 'axios'

function VideoHome() {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [video, setVideo] = useState(null);
    const [allVids, setAllVids] = useState(null);

    useEffect(() => {
        updateVids()
    }, []);

    const submit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("file", video);
        formData.append("name", name);
        formData.append("duration", duration);
        axios({
            method: "post",
            url: "http://localhost:8080/api/video",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                updateVids()
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    function updateVids() {
        axios.get('http://localhost:8080/api/videos')
            .then(function (response) {

                setAllVids(response.data.map((k, v) => {
                    return k["video_path"]
                }).map((v) => {
                    if (v != null) {
                        let ext = v.match(/\.[0-9a-z]+$/i)[0]
                        console.log(ext)
                        if (ext === ".png" || ext === ".jpg" || ext === ".webm") {
                            return <img className="img-thumbnail" src={"http://localhost:8080/img/" + v} alt="" />
                        } else if (ext === ".mp4") {
                            return <video autoPlay controls >
                                <source src={"http://localhost:8080/img/" + v} type="video/mp4"></source>
                            </video>
                        }
                    }
                    return "empty"
                }));

            })
            .catch(function (error) {
                // обработка ошибки
                console.log(error);
            })
            .finally(function () {
                // выполняется всегда
            });
    }

    return (
        
        <div className="App">
            <Header active="videos" />

            <div>
                <div className="container">


                    <div class="row row-cols-1 row-cols-md-2 g-4">
                        <div class="col">
                            <div class="card">
                                <img src="https://truba-truba.ru/upload/iblock/0f7/0f76afd28c4d8e63f86663e2ed6a8776.png" class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <img src="https://truba-truba.ru/upload/iblock/0f7/0f76afd28c4d8e63f86663e2ed6a8776.png" class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <img src="https://truba-truba.ru/upload/iblock/0f7/0f76afd28c4d8e63f86663e2ed6a8776.png" class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                                    </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="card">
                                <img src="https://truba-truba.ru/upload/iblock/0f7/0f76afd28c4d8e63f86663e2ed6a8776.png" class="card-img-top" alt="..."/>
                                    <div class="card-body">
                                        <h5 class="card-title">Card title</h5>
                                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <div className="d-grid gap-2">
                                <button type="button" className="btn create-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Загрузить видео
                                </button>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="row">
                        <div className="d-grid gap-2">
                            {allVids}
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog modal-dialog-centered">
                        <div className="modal-content text-black">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Добавить видео</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body text-black">
                                <h2>{name + " " + duration}</h2>
                                <form action="" method="post" encType="multipart/form-data" onSubmit={submit}>
                                    <div>
                                        <input value={name} onChange={(e) => setName(e.target.value)} required name="name" className="form-control form-control-lg" type="text" placeholder="Введите название видео" aria-label=".form-control-lg example" />
                                        <input value={duration} onChange={(e) => setDuration(e.target.value)} required name="duration" className="form-control form-control-lg mt-2" type="text" placeholder="Введите название видео" aria-label=".form-control-lg example" />
                                        <input onChange={(e) => setVideo(e.target.files[0])} className="form-control form-control-lg mt-2" name="file" id="file-input" type="file" />
                                        <button className="btn btn-lg mt-2 btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default VideoHome;