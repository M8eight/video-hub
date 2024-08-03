import React from "react";
import { request } from "../helpers/axios_helper";

export default class AddVideoModal extends React.Component {
    nameClassName = "form-control form-control-lg mb-2"
    descriptionClassName = "form-control";

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            video: null,
            isNameValid: false,
            isDescriptionValid: false,
        };
    }

    submited(e) {
        if (this.state.name) {
            this.sendVideo(e)
        } else {
            this.err();
        }
    }

    sendVideo(e) {
        let formReq = new FormData();
        formReq.append("name", this.state.name);
        formReq.append("description", this.state.description);
        formReq.append("videoFile", this.state.video);
        e.target.innerHTML = 'Загрузка <span class="spinner-border spinner-border-sm" aria-hidden="true"></span></>'

        request("post", "http://localhost:8080/api/video", formReq, { "Content-Type": "multipart/form-data" })
            .then((response) => {
                console.log(response);
                window.location.reload();
                //todo сделать что бы не обновлялась страница

            })
            .catch((response) => {
                console.error(response);
            });
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
                                <input required value={this.name} onChange={(e) => this.validText(e, { length: 6 }, this.nameClassName)} className={this.nameClassName} name="name" placeholder="Введите название видео" type="text" />
                                <div className="form-floating mb-2">
                                    <textarea required value={this.description} onChange={(e) => this.validText(e, { length: 20 }, this.descriptionClassName)} className={this.descriptionClassName} id="descArea" name="description"></textarea>
                                    <label htmlFor="descArea">Описание</label>
                                </div>
                                <input id="qwerty" required onChange={(e) => this.setState({ video: e.target.files[0] })} className="form-control form-control-lg mb-3" name="file" type="file" accept="video/*" />
                                <button onClick={this.submited} className="btn btn-lg btn-primary submit-vid">Опубликовать</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

    validText(e, settings, classNames) {
        let value = e.target.value;
        let length = settings.length;
        if (length <= value.length) {
            e.target.className = classNames + " is-valid"
        } else {
            e.target.className = classNames + " is-invalid"
        }
    }
} 