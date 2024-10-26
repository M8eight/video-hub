import React, { useEffect } from "react";
import { request } from "../../helpers/axios_helper";
import { useForm } from "react-hook-form";

import "./reportCollapse.css";

export default function ReportCollapse() {
    const [isLoading, setIsLoading] = React.useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data) {
        let formReq = new FormData();
        formReq.append("message", data.message);
        formReq.append("videoId", window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1));

        setIsLoading(true);
        request("post", "/api/report", formReq, { "Content-Type": "multipart/form-data" })
            .then((response) => {
                // window.location.reload();
                setIsLoading(false); 
            })
            .catch((response) => {
                console.error(response);
            });
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div class="collapse" id="reportCollapse">
                    <div class="card card-body">
                        <div className="col-lg-12 ">

                            <h1 className="text-center">Создать жалобу </h1>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <textarea type="text" className="form-control form-control-lg mb-2 convex-button" placeholder="Текст жалобы"
                                    {...register("message", {
                                        required: true,
                                        maxLength: 200,
                                        minLength: 4
                                    })}
                                />
                                {errors?.name?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле текст жалобы обязательно</p>}
                                {errors?.name?.type === "maxLength" && (
                                    <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле текст жалобы должно быть не больше 200 символов</p>
                                )}
                                {errors?.name?.type === "minLength" && (
                                    <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле текст жалобы должно быть больше 4 символов</p>
                                )}

                                <input type="submit" className="btn btn-lg btn-success w-100 mb-3 fs-3" value={"Отправить жалобу"} />

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

