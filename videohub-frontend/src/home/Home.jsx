import React from "react";
import Header from "../components/Header";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }



    render() {
        return (
            <React.Fragment>
                <Header currentTab="home" />

                <div id="home">
                    <h2 className="text-center">Главная страница</h2>
                </div>

                
            </React.Fragment>
        )
    }
}