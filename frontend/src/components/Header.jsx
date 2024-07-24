import "./header.css";

function Header(props) {
    const checkActive = (prop, targetTab) => {
        if (prop === targetTab) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">VideoHub</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className={"nav-item " + (checkActive(props.currentTab, "home")?"active-tab":"")}>
                            <a className={"nav-link " + (checkActive(props.currentTab, "home")?"active":"")} aria-current="page" href="/">Home</a>
                        </li>
                        <li className={"nav-item " + (checkActive(props.currentTab, "videos")?"active-tab":"")}>
                            <a className={"nav-link " + (checkActive(props.currentTab, "videos")?"active":"")} href="/videos">Videos</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;