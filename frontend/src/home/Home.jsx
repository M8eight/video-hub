import React from 'react'
import Header from "../header/Header"
import './home.css';

function Home() {
    return (
        <React.Fragment>
            <div className="container">
                <header>
                    <Header active="home" />
                </header>

                    <div className="row">
                        <div className="col"></div>
                        <div className="col">
                            <h2 className="text-center">Сайт с видео</h2>
                            <img src="https://img.freepik.com/free-photo/realistic-z-letter-with-metallic-surface_23-2150458453.jpg" className="App-logo" alt="logo" />
                        </div>
                        <div className="col"></div>
                    </div>
            </div>

        </React.Fragment >
    );
}

export default Home;