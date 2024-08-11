import React from "react"
import Header from "../../components/Header"

export default function Register(props) {
    return (
        <React.Fragment>
            <Header currentTab="register" />
            <div className="container-fluid p-3">
                <h1 className="text-center">Регистрация</h1>
                <input type="text" className="form-control form-control-lg mb-2 text-center" required placeholder="Ваша почта" />
                <input type="text" className="form-control form-control-lg mb-2 text-center" required placeholder="Логин" />
                <input type="password" className="form-control form-control-lg mb-2 text-center" required placeholder="Пароль" />
                <input type="button" className="btn btn-lg btn-success w-100 mb-3 fs-3" value="Создать аккаунт" />
                <h3 className="text-center text-bg-warning"><a href="/login" className="text-dark text-decoration-none">👉Войти (В аккаунт)👈</a></h3>
            </div>
        </React.Fragment>
    )
}