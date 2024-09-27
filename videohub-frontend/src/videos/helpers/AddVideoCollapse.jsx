import React, { useEffect } from "react";
import { request } from "../../helpers/axios_helper";
import { useForm } from "react-hook-form";

import "./AddVideoCollapse.css";

export default function AddVideoModal() {
    const [isLoading, setIsLoading] = React.useState(false);
    const videoTagRef = React.createRef();
    const [videoTags, setVideoTags] = React.useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data) {
        let formReq = new FormData();
        formReq.append("name", data.name);
        formReq.append("description", data.description);
        formReq.append("videoFile", data.videoFile[0]);
        let sortedVidTags = Array.from(videoTags.filter((el) => el.trim() !== "").map((el) => el.trim()));

        formReq.append("videoTags", Array.from(new Set(sortedVidTags)));

        setIsLoading(true);
        request("post", "/api/video", formReq, { "Content-Type": "multipart/form-data" })
            .then((response) => {
                window.location.reload();
                setIsLoading(false);
            })
            .catch((response) => {
                console.error(response);
            });
    }

    function checkDistinct(array) {
        const checkSet = new Set(array);
        
        // Strict equality 
        // Return boolean value
        return checkSet.size === array.length;  
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div class="collapse" id="videoCollapse">
                    <div class="card card-body">
                        <div className="col-lg-12 ">
                            <h1 className="text-center">Опубликовать видео </h1>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <input type="text" className="form-control form-control-lg mb-2 convex-button" placeholder="Название видео"
                                    {...register("name", {
                                        required: true,
                                        maxLength: 200,
                                        minLength: 5
                                    })}
                                />
                                {errors?.name?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле название обязательно</p>}
                                {errors?.name?.type === "maxLength" && (
                                    <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле название должно быть не больше 200 символов</p>
                                )}
                                {errors?.name?.type === "minLength" && (
                                    <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле название должно быть больше 5 символов</p>
                                )}

                                {!checkDistinct(videoTags) && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Теги должны быть уникальными</p>}
                                <h4 className="overflow-hidden">
                                    {videoTags?.map((el) => el !== "" && (
                                        <span key={el} class="badge text-bg-secondary me-2">{el}</span>
                                    ))}
                                </h4>
                                <input type="text" className="form-control form-control-lg mb-2 convex-button" ref={videoTagRef} placeholder="Теги видео (через запятую)"
                                    {...register("videoTags", {
                                        required: true,
                                        maxLength: 50,
                                        minLength: 1
                                    })}
                                    onChange={(e) => {
                                        setVideoTags(Array.from(e.target.value.split(',').filter((el) => el.trim() !== "").map((el) => el.trim())));
                                    }}
                                />

                                <input type="text" className="form-control form-control-lg mb-2 convex-button" placeholder="Описание видео"
                                    {...register("description", {
                                        required: true,
                                        maxLength: 500,
                                        minLength: 5
                                    })}
                                />
                                {errors?.description?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле описание обязательно</p>}
                                {errors?.description?.type === "maxLength" && (
                                    <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле описание должно быть не больше 20 символов</p>
                                )}
                                {errors?.description?.type === "minLength" && (
                                    <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле описание должно быть больше 5 символов</p>
                                )}

                                <input required className={"form-control form-control-lg mb-3 form-control-lg mb-2 convex-button"} name="file" type="file" accept="video/*"
                                    {...register("videoFile", {
                                        required: true,
                                        maxLength: 200,
                                        minLength: 5
                                    })}
                                />
                                {errors?.videoFile?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле файл обязательно</p>}
                                {
                                    isLoading ? (<p className="loader my-3"></p>) : null
                                }

                                <input type="submit" className="btn btn-lg btn-success w-100 mb-3 fs-3" value={"Опубликовать"} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
