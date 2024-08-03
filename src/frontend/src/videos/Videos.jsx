import React from 'react'
import Header from '../components/Header';
import { request } from '../helpers/axios_helper';
import AddVideoModal from './AddVideoModal';

import "./videoHome.css";

export default class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            errors: "visually-hidden"
        }
    }

    getVideos() {
        request('get', '/api/videos')
            .then((res) => {
                this.setState({ data: res.data })
            }).catch(err => {
                this.setState({ errors: "" })
            })
    }

    componentDidMount() {
        this.getVideos();
    }

    render() {
        return (
            <React.Fragment>
                <Header currentTab="videos" />

                <div className={"alert alert-danger w-100 text-center " + this.state.errors} role="alert">
                    Ошибка загрузки видео
                </div>

                <AddVideoModal />

                <div id="videos">
                    <h2 className="text-center">Все видео</h2>

                    <div className="container">
                        <div className="col"></div>
                        <div className="col ">
                            <button type="button" className="btn btn-warning w-100 mb-3" data-bs-toggle="modal" data-bs-target="#videoModal">Загрузить видео</button>
                        </div>
                        <div className="col"></div>
                    </div>

                    <div className="container-fluid">
                        <div className="row row-cols-1 row-cols-md-5 g-4">
                            {this.state.data.map((el) => (
                                <div key={el.id} className="col">
                                    <a href={"http://localhost:3000/video/" + el.id}>
                                        <div className="card mb-3 parent">
                                            <img className="card-img-top preview" src={"http://localhost:8080/media/" + el.preview_path} alt="" />
                                            <div className="card-body p-1">
                                                <h6 className="card-title cut-text m-1">{el.name}</h6>
                                            </div>
                                        </div>
                                    </a>
                                </div >
                            ))}
                        </div>
                    </div>

                </div>

            </React.Fragment>
        )
    }
}