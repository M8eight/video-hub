import React from "react";
import Header from "../components/Header";

import "./Home.css";

export default function Home() {
    const [horrorSlide, setHorrorSlide] = React.useState(false);

    return (
        <React.Fragment>
            <Header currentTab="home" />

            <div className="container mt-4">
                <div id="home">
                    <h2 className="text-center mb-4">Главная страница</h2>
                    {
                        horrorSlide ? (
                            <React.Fragment>
                                <img src="https://i.gifer.com/GMxB.gif" class="all-screen noselect" onDragStart={e => e.preventDefault()} onMouseDown={e => { return false }} alt="" />
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
                    <div id="carouselExampleInterval" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src={"http://localhost:8080/media/globus.gif"} class="d-block carouselca-img" style={{ maxHeight: "300px" }} alt="..." />
                            </div>
                            <div class="carousel-item" >
                                <img src="https://i.pinimg.com/564x/f0/ac/57/f0ac57cce3d0ec44bbed6035eb7af1d7.jpg" class="d-block carouselca-img noselect face" onDragStart={e => e.preventDefault()} onMouseDown={e => { return false }} alt="..." />
                            </div>
                        </div>
                        {
                            horrorSlide ? null : (
                                <React.Fragment>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev" onClick={() => setHorrorSlide(!horrorSlide)}>
                                        <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next" onClick={() => setHorrorSlide(!horrorSlide)}>
                                        <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
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
