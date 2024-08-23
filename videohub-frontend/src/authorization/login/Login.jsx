import React, { useEffect, useState } from "react"
import Header from "../../components/Header"

import { redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import { request } from "../../helpers/axios_helper";

import "../authorization.css"
import "./login.css"

export default function Login(props) {
    const [cubes] = useState(
        Array.from({ length: 60 }, (x, i) => i).map(el => {
            let rnd = getRandomInt(2, 10);
            return (
                <div style={{ "--animation-time": rnd + "s" }} className={"col-lg-1 col-md-2 col-xs-1 animate-flicker"}>
                    <div className="box"></div>
                </div>
            )
        })
    );

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function onSubmit(data) {
        request("post", "http://localhost:8080/auth/register", data)
            .then((response) => {
                console.log(response);
                redirect("/")
                //todo сделать что бы не обновлялась страница
            })
            .catch((response) => {
                console.error(response);
            });
    }

    return (
        <React.Fragment>

            <Header currentTab="login" />

            <div className="container-fluid">
                <div className="paint">
                    <div className="row">
                        {cubes}
                    </div>

                </div>
                <div className="col-lg-6 position-absolute top-50 start-50 translate-middle ">
                    <div className="border p-3 rounded-3 border-1 form-frame">
                        <h1 className="text-center">Вход</h1>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" className="form-control form-control-lg mb-2 convex-button" placeholder="Ваш email"
                                {...register("email", {
                                    required: true,
                                    minLength: 5,
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })}
                            />
                            {errors?.email?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger"> Поле email обязательно</p>}
                            {errors?.email?.type === "minLength" && (
                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле email должно быть больше 20 символов</p>
                            )}
                            {errors?.email?.type === "pattern" && (
                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Это не электронная почта</p>
                            )}

                            <input type="text" className="form-control form-control-lg mb-2 convex-button" placeholder="Ваше имя пользователя"
                                {...register("username", {
                                    required: true,
                                    maxLength: 20,
                                    minLength: 5
                                })}
                            />
                            {errors?.username?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле имя пользователя обязательно</p>}
                            {errors?.username?.type === "maxLength" && (
                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле имя пользователя должно быть не больше 20 символов</p>
                            )}
                            {errors?.username?.type === "minLength" && (
                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле имя пользователя должно быть больше 5 символов</p>
                            )}

                            <input type="password" className="form-control form-control-lg mb-2 convex-button" placeholder="Ваш пароль"
                                {...register("password", {
                                    required: true,
                                    maxLength: 100,
                                    minLength: 4
                                })}
                            />
                            {errors?.password?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле пароль обязательно</p>}
                            {errors?.password?.type === "minLength" && (
                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле пароль должно быть не менее 4 символов</p>
                            )}
                            {errors?.password?.type === "maxLength" && (
                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле пароль должно быть не больше 100 символов</p>
                            )}

                            <input type="submit" className="btn btn-lg btn-info w-100 mb-3 fs-3 " value="Войти" />
                        </form>
                    </div>
                </div>
            </div>


            {/* <h1 className="text-center">Войти в аккаунт</h1>
            <input type="text" className="form-control form-control-lg mb-2 text-center" required placeholder="Ваш логин" />
            <input type="password" className="form-control form-control-lg mb-2 text-center" required placeholder="Ваш пароль" />
            <input type="button" className="btn btn-lg btn-info w-100 mb-3 fs-3" value="Войти" /> */}
        </React.Fragment>
    )

}