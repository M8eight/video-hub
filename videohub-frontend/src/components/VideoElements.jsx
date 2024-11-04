import React, { useState } from "react"
import toHHMMSS from "../helpers/toHHMMSS"

export default function VideoElements(props) {
    const [isVideoVisible, setIsVideoVisible] = useState({})

    const handleMouseEnter = (id) => {
        setIsVideoVisible((prevState) => ({ ...prevState, [id]: true }))
    }

    const handleMouseLeave = (id) => {
        setIsVideoVisible((prevState) => ({ ...prevState, [id]: false }))
    } 

    return (
        <React.Fragment>
            {props.videos === undefined && (
                <div className="text-center text-bg-danger">
                    Ошибка
                </div>
            )}

            <div className="row row-cols-1 row-cols-md-5 g-4">
                {props.videos?.map((el) => (
                    <div key={el.id} className="col" onMouseEnter={() => handleMouseEnter(el.id)} onMouseLeave={() => handleMouseLeave(el.id)}>
                        <a href={"http://localhost:3000/video/" + el.id}>
                            <div className="card mb-3 parent">
                                {isVideoVisible[el.id] ? (
                                    <video className="card-img-top preview"
                                        autoPlay
                                        muted
                                        loop
                                        >
                                        <source src={"http://localhost:8080/previews/" + el.video_path} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img className="card-img-top preview" src={"http://localhost:8080/pictures/" + el.preview_path} alt="" />
                                )}

                                <span className="card-body">
                                    <h6 className="mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill me-1 mb-1" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                        </svg>
                                        {el.views}
                                    </h6>
                                </span>
                                <span className="card-body float-end">
                                    <h6 className="float-end mb-4">{toHHMMSS(el.duration)}</h6>
                                </span>
                                <div className="card-body p-1">
                                    <h6 className="card-title cut-text m-1">{el.name}</h6>
                                </div>
                            </div>
                        </a>
                    </div >
                ))}
            </div>
        </React.Fragment>
    )
}
