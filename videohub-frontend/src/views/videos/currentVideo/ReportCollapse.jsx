import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../../../slices/report/reportRequests"

import "./reportCollapse.css";

export default function ReportCollapse() {
    const dispatch = useDispatch();
    const reportObj = useSelector((state) => state.report);

    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data) {
        let formReq = new FormData();
        formReq.append("message", data.message);
        formReq.append("videoId", window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1));

        dispatch(addReport(formReq));
    }

    return (
        <React.Fragment>
            <div className="container-fluid">
                <div className="collapse" id="reportCollapse">
                    <div className="card card-body">
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

                                <button type="submit" className={"btn btn-lg btn-success w-100 mb-3 fs-3" + (reportObj?.isCreate || reportObj?.loading ? (" disabled") : "")} value={"Отправить жалобу"}>
                                    {reportObj?.isCreate ? "Жалоба созданна" : ""}
                                    {reportObj?.loading ? (
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : ""}
                                    {!reportObj?.isCreate && !reportObj?.loading ? "Создать жалобу" : ""}
                                </button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

