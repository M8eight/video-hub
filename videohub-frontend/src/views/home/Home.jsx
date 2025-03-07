import React from "react";
import Header from "../../components/Header";

import "./home.css";

export default function Home() {
    const [horrorSlide, setHorrorSlide] = React.useState(false);

    return (
        <React.Fragment>
            <Header currentTab="home" />

            <div className="container mt-4">
                <div id="home">
                    <h2 className="text-center mb-4">
                        Главная страница{" "}
                        <svg style={{ color: "white" }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                            <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                        </svg>
                    </h2>
                    <div class="d-grid gap-2 col-6 my-3 mx-auto"><a href="/videos" class="btn btn-info">Перейти к видео</a></div>
                    {
                        horrorSlide ? (
                            <React.Fragment>
                                <img src="https://i.gifer.com/GMxB.gif" className="all-screen noselect" onDragStart={e => e.preventDefault()} onMouseDown={e => { return false }} alt="" />
                                <audio autoPlay onPlay={(e) => {
                                    let audio = e.target;
                                    let initialVolume = audio.volume;
                                    let startTime = performance.now();
                                    let duration = 20000;

                                    let tick = () => {
                                        let elapsed = performance.now() - startTime;
                                        audio.volume = Math.min(1, initialVolume * (elapsed / duration));
                                        if (elapsed < duration) {
                                            requestAnimationFrame(tick);
                                        }
                                    };
                                    tick();
                                }}>
                                    <source src={"http://localhost:8080/media/FicaraTwilight.mp3"} type="audio/wav" />
                                </audio>
                            </React.Fragment>)
                            : null
                    }
                    <div id="carouselExampleInterval" className="carousel slide">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={"globus.gif"} className="d-block carouselca-img" style={{ maxHeight: "300px" }} alt="..." />
                            </div>
                            <div className="carousel-item" >
                                <img src="https://i.pinimg.com/564x/f0/ac/57/f0ac57cce3d0ec44bbed6035eb7af1d7.jpg" className="d-block carouselca-img noselect face" onDragStart={e => e.preventDefault()} onMouseDown={e => { return false }} alt="..." />
                            </div>
                        </div>
                        {
                            horrorSlide ? null : (
                                <React.Fragment>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev" onClick={() => setHorrorSlide(!horrorSlide)}>
                                        <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next" onClick={() => setHorrorSlide(!horrorSlide)}>
                                        <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </React.Fragment>
                            )
                        }

                    </div>

                </div>
            </div>


        </React.Fragment>
    )
}
