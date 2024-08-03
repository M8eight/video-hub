import React from "react"
import Header from "../../components/Header"

export default function Login(props) {
    return (
        <React.Fragment>
            <Header />
            <h1 className="text-center">Войти в аккаунт</h1>
            <input type="text" className="form-control form-control-lg mb-2 text-center" required placeholder="Ваш логин" />
            <input type="password" className="form-control form-control-lg mb-2 text-center" required placeholder="Ваш пароль" />
            <input type="button" className="btn btn-lg btn-info w-100 mb-3 fs-3" value="Войти" />
            <h3 className="text-center text-bg-warning"><a href="/register" className="text-dark text-decoration-none">Если нет аккаунта зарегистрируйтесь</a></h3>
        </React.Fragment>
    )

}