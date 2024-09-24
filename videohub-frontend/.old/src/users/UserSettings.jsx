import React, { useEffect, useState } from "react"
import { set, useForm } from "react-hook-form";
import { request } from "../helpers/axios_helper";
import { getUserId } from '../helpers/jwt_helper';

export default function UserSettings(props) {
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const [passLoadStatus, setPassLoadStatus] = useState(0);
    const [avatarLoadStatus, setAvatarLoadStatus] = useState(0);
    const [userData, setUserData] = React.useState(null);
    const [avatar, setAvatar] = React.useState(null);

    useEffect(() => {
        setUserData(props.userData);
        setAvatar(props.avatar);
    }, [props.userData, props.avatar]);

    function onSubmit(data) {
        setPassLoadStatus(1);
        const formData = new FormData();
        formData.append("oldPassword", data.oldPassword)
        formData.append("password", data.password)
        request("post", "/api/user/password/reset", formData, { "Content-Type": "multipart/form-data" })
            .then((response) => {
                setPassLoadStatus(2);
            })
            .catch((response) => {
                setPassLoadStatus(-1);
                console.error(response);
            });
    }

    return (
        <React.Fragment>
            <div className="row">
                <h2 className="text-center">Настройки пользователя</h2>
                {
                    userData?.id === getUserId() ? (
                        <div className="d-grid gap-2 col-6 my-3 mx-auto">
                            <button type="button" className="btn btn-warning" data-bs-toggle="collapse" href="#userEdit" aria-expanded="false" aria-controls="userEdit">Изменить профиль</button>
                            <div className="collapse" id="userEdit">
                                <div className="card card-body">
                                    <div className="col-lg-12 ">
                                        <h1 className="text-center">Изменить профиль </h1>


                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <input type="text" className="form-control form-control-lg mb-2 convex-button" placeholder="Старый пароль"
                                                {...register("oldPassword", {
                                                    required: true,
                                                    maxLength: 100,
                                                    minLength: 4
                                                })}
                                            />
                                            {errors?.oldPassword?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле старый пароль обязательно</p>}
                                            {errors?.oldPassword?.type === "maxLength" && (
                                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле старый пароль должно быть не больше 100 символов</p>
                                            )}
                                            {errors?.oldPassword?.type === "minLength" && (
                                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле старый пароль должно быть больше 5 символов</p>
                                            )}
                                            {passLoadStatus === -1 && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Неправильно введен пароль</p>}

                                            <input type="text" className="form-control form-control-lg mb-2 convex-button" placeholder="Новый пароль"
                                                {...register("password", {
                                                    required: true,
                                                    maxLength: 100,
                                                    minLength: 4

                                                })}
                                            />
                                            {errors?.password?.type === "required" && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле пароль обязательно</p>}
                                            {errors?.password?.type === "maxLength" && (
                                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле пароль должно быть не больше 100 символов</p>
                                            )}
                                            {errors?.password?.type === "minLength" && (
                                                <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Поле пароль должно быть больше 4 символов</p>
                                            )}


                                            <input type="text" className="form-control form-control-lg mb-2 convex-button" placeholder="Подтвердите новый пароль"
                                                {...register("passwordConfirm", {
                                                    required: true,
                                                    validate: (value) => value === watch("password"),
                                                })}
                                            />
                                            {errors?.passwordConfirm && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Пароли не совпадают</p>}



                                            <input type="submit" className={"btn btn-lg btn-primary w-100 mb-3 fs-3" + ([1, 2].includes(passLoadStatus) ? " disabled" : "")} value={(passLoadStatus === 2 ? "Успешно" : "Сбросить пароль")} />

                                        </form>

                                        {/* <form onSubmit={(e) => {
                                            e.preventDefault()
                                            request("post", "/api/user/edit/email", {
                                                email: e.target.elements.email.value
                                            }).then((res) => {
                                                setUserData(res.data)
                                            })
                                        }}>
                                            <div className="form-group">
                                                <label className="text">Email:</label>
                                                <input className="form-control" type="email" name="email" defaultValue={userData.email} />
                                            </div>
                                            <button type="submit" className="btn btn-primary mt-3">Изменить email</button>
                                        </form> */}

                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            const formData = new FormData();
                                            formData.append("avatar", avatar)
                                            setAvatarLoadStatus(1)
                                            request("post", `/api/user/avatar`, formData, { "Content-Type": "multipart/form-data" }).then((res) => {
                                                setUserData(res.data)
                                                setAvatarLoadStatus(2)
                                                window.location.reload()
                                            }).catch((err) => {
                                                setAvatarLoadStatus(-1)
                                            })
                                        }}>
                                            <div className="form-group mt-3">
                                                <h4 className="text">Аватар:</h4>
                                                {avatar !== null && avatar !== undefined ? (<img className='img-fluid center rounded-circle' style={{ maxHeight: "200px" }} src={URL.createObjectURL(avatar)} alt="" srcSet="" />) : null}
                                                <input required className="form-control" onChange={(e) => setAvatar(e.target.files[0])} type="file" name="avatar" />
                                                {avatarLoadStatus === -1 && <p className="fs-4 pb-2 mb-4 text-danger border-bottom border-danger">Ошибка загрузки</p>}
                                            </div>
                                            <button type="submit" className={"btn btn-primary mt-3" + ([1, 2].includes(avatarLoadStatus) ? " disabled" : "")}>{(passLoadStatus === 2 ? "Успешно" : "Изменить аватар")}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

            </div>
        </React.Fragment>
    )
}