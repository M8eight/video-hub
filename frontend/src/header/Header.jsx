import "./header.css";

function isActiveNav(str, propsStr) {
    if (str === propsStr) {
        return "active active-tab";
    }
}

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
                <a className="navbar-brand" href="/">
                    <span>Vid</span>
                    <span className="blue-text">eo</span>
                    <span className="red-text">Hub</span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className={"nav-item" + isActiveNav("home", props.active)}>
                            <a className="nav-link" aria-current="page" href="/">Главная</a>
                        </li>
                        <li  className={"nav-item" + isActiveNav("videos", props.active)}>
                            <a className="nav-link " href="/videos">Видео</a>
                        </li>
                    </ul>
                </div>
                <form className="d-flex" role="search">
                    <a href="/" className="btn btn-outline-light">Войти</a>
                </form>
            </div>
        </nav>
    );
}

export default Header;