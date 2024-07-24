import Header from "../components/Header";
import React from "react";

function Home(params) {
    return (
        <React.Fragment>
            <Header currentTab="home"/>

            <div id="home">
                <h2 className="text-center">Главная страница</h2>
            </div>
        </React.Fragment>
    );
}

export default Home;