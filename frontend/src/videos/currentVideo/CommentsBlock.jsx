/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, createRef } from "react";
import axios from 'axios';

function CommentsBlock(params) {
    const [comments, setComments] = useState(null);

    const [text, setText] = useState("");

    useEffect(() => {
        getComments()
    }, []);

    function ratingUp(e, id) {
        axios.post('http://localhost:8080/api/rating/' + id + "/up")
            .then(function (response) {
                e.target.parentElement.parentElement.childNodes[1].firstChild.innerText = response.data.rating_up
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {

            });
    }

    function ratingDown(e, id) {
        axios.post('http://localhost:8080/api/rating/' + id + "/down")
            .then(function (response) {
                e.target.parentElement.parentElement.childNodes[2].firstChild.innerText = response.data.rating_down
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {

            });
    }

    function getComments() {
        let videoId = window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1)

        axios.get('http://localhost:8080/api/video/' + videoId + "/comments")
            .then(function (response) {
                let commentsResp = response.data
                let commentsList = []
                commentsResp.forEach(element => {
                    let date = new Date(element.updated_at);
                    let month = date.getMonth();
                    if (month.toString().length === 1) {
                        month= "0" + month
                    }
                    let formatDate = date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + month + "." + date.getFullYear()
                    commentsList.push(
                        
                        <div className="card mb-4" key={element.id}>
                            <div className="card-body">
                                <p>{element.text}</p>

                                <div className="d-flex justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <p className="small mb-0 ms-2">АНОНИМ</p>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                        <a className="link-light me-1 text-success" onClick={(e) => { ratingUp(e, element.rating.id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                            </svg>
                                        </a>
                                        <span className="text-success font-weight-bold user-select-none"><b>{element.rating.rating_up}</b></span>
                                        <span className="text-danger mx-1 user-select-none"><b>{element.rating.rating_down}</b></span>
                                        <a className="link-light me-2 text-danger" onClick={(e) => { ratingDown(e, element.rating.id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                            </svg>
                                        </a>
                                        <i className="small text-muted mb-0 ms-2 user-select-none">{formatDate}</i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                });
                setComments(commentsList);
            })
            .catch(function (error) {
                console.error(error)
            })
            .finally(function () {

            });
    }

    function submit(e) {
        let formReq = {
            "text": text,
        }
        axios({
            method: "post",
            url: "http://localhost:8080/api/video/" + window.location.pathname.substring(window.location.pathname.lastIndexOf("/") + 1) + "/comment/new",
            data: formReq,
        })
            .then((response) => {
                getComments();
            })
            .catch((response) => {
                console.error(response);
            });
    }

    return (
        <React.Fragment>
            <div className="collapse" id="collapseExample">
                <div className="d-flex justify-content-between mb-2 ">
                    <div className="d-flex flex-row w-100 align-items-center me-2">
                        <div className="input-group mb-3">
                            <input required value={text} onChange={(e) => setText(e.target.value)} className="form-control form-control-lg" name="text" placeholder="Введите текст коментария" type="text" aria-describedby="comment-submit" />
                            <button onClick={submit} className="btn btn-lg btn-primary" id="comment-submit">Опубликовать</button>
                        </div>
                    </div>
                </div>
            </div>

            {comments}
        </React.Fragment >
    )
}

export default CommentsBlock;