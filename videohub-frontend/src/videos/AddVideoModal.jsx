import React from "react";
import { request } from "../helpers/axios_helper";
import Cookies from "js-cookie";

export default class AddVideoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            video: null,
            nameClass: "",
            descriptionClass: "",
            fileClass: "",
        };
    }

    sendVideo(e) {
        let fileIsValid = this.state.video !== null
        let nameIsValid = this.state.nameClass === "is-valid";
        let descriptionIsValid = this.state.descriptionClass === "is-valid";
        if (!fileIsValid) {
            this.setState({ fileClass: "is-invalid" });
        }
        if (!nameIsValid) {
            this.setState({ nameClass: "is-invalid" });
        }
        if (!descriptionIsValid) {
            this.setState({ descriptionClass: "is-invalid" });
        }

        if (nameIsValid && descriptionIsValid && fileIsValid) {
            let formReq = new FormData();
            formReq.append("name", this.state.name);
            formReq.append("description", this.state.description);
            formReq.append("videoFile", this.state.video);
            e.target.innerHTML = 'Загрузка <span class="spinner-border spinner-border-sm" aria-hidden="true"></span></>'

            request("post", "/api/video", formReq, { "Content-Type": "multipart/form-data" })
            .then((response) => {
                window.location.reload(); 
            })
            .catch((response) => {
                console.error(response);
            });
        }
    }

    err() {
        console.log("validation error")
    }

    render() {
        return (
            <div className="modal fade" id="videoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-black">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Добавить видео</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body text-black">
                            <div>
                                <input required value={this.name} onChange={(e) => this.nameValid(e, { length: 6 })} className={"form-control form-control-lg mb-2 " + this.state.nameClass} name="name" placeholder="Введите название видео" type="text" />
                                <div className="form-floating mb-2">
                                    <textarea required value={this.description} onChange={(e) => this.descriptionValid(e, { length: 10 })} className={"form-control " + this.state.descriptionClass} id="descArea" name="description"></textarea>
                                    <label htmlFor="descArea">Описание</label>
                                </div>
                                <input id="qwerty" required onChange={(e) => this.fileValid(e)} className={"form-control form-control-lg mb-3 " + this.state.fileClass} name="file" type="file" accept="video/*" />
                                <button onClick={(e) => { this.sendVideo(e) }} className="btn btn-lg btn-primary submit-vid">Опубликовать</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    nameValid(e, settings) {
        let value = e.target.value;
        this.setState({ name: value });

        let length = settings.length;
        if (length <= value.length) {
            this.setState({ nameClass: "is-valid" })
        } else {
            this.setState({ nameClass: "is-invalid" })
        }
    }

    descriptionValid(e, settings) {
        let value = e.target.value;
        this.setState({ description: value });

        let length = settings.length;
        if (length <= value.length) {
            this.setState({ descriptionClass: "is-valid" })
        } else {
            this.setState({ descriptionClass: "is-invalid" })
        }
    }

    fileValid(e) {
        let file = e.target.files[0]

        if (file !== undefined) {
            this.setState({ video: file })
            this.setState({ fileClass: "is-valid" })
        } else {
            this.setState({ fileClass: "is-invalid" })
        }
    }
} 