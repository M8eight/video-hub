import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getComments, commentRatingDown, commentRatingUp, createComment } from "../../../slices/comment/commentRequests";

function CommentsBlock(props) {
    const dispatch = useDispatch();
    const comment = useSelector((state) => state.comment);

    const [commentText, setText] = useState("");

    useEffect(() => {
        dispatch(getComments(props.videoId));
    }, []);

    const createCommentSubmit = () => {
        dispatch(createComment({ videoId: props.videoId, text: commentText }))
        dispatch(getComments(props.videoId));
    }

    return (
        <>
            <div className="collapse" id="collapseExample">
                <div className="d-flex justify-content-between mb-2 ">
                    <div className="d-flex flex-row w-100 align-items-center me-2">
                        <div className="input-group mb-3">
                            <input required value={commentText} onChange={(e) => { setText(e.target.value) }} className="form-control form-control-lg" name="text" placeholder="Введите текст коментария" type="text" aria-describedby="comment-submit" />
                            <button onClick={() => createCommentSubmit()} className="btn btn-lg btn-primary" id="comment-submit">Опубликовать</button>
                        </div>
                    </div>
                </div>
            </div>

            {comment?.comments?.map((commentEl) => (
                <div className="card mb-4" key={commentEl.id}>
                    <div className="card-body">
                        <p>{commentEl.text}</p>

                        <div className="d-flex justify-content-between">
                            <a href={"/user/" + commentEl.user?.id} className="link-light text-decoration-none">
                                <div className="d-flex flex-row align-items-center">
                                    <img
                                        className="center rounded-circle img-cropped"
                                        style={{ height: "3rem", width: "3rem" }}
                                        src={
                                            commentEl.user?.avatar_path !== null
                                                ? "http://localhost:8080/avatars/" + commentEl.user?.avatar_path
                                                : "/default-avatar.png"
                                        }
                                        alt="Avatar field"
                                    />
                                    <p className="small mb-0 ms-2">Автор: {commentEl.user?.login}</p>
                                </div>
                            </a>
                            <div className="d-flex flex-row align-items-center">
                                <button className="btn link-light me-1 text-success" onClick={(e) => { dispatch(commentRatingUp(commentEl.rating.id)) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
                                    </svg>
                                </button>
                                <div className="text-success font-weight-bold user-select-none"><b>{commentEl.rating.rating_up}</b></div>
                                <div className="text-danger mx-1 user-select-none"><b>{commentEl.rating.rating_down}</b></div>
                                <button className="btn link-light me-2 text-danger" onClick={(e) => { dispatch(commentRatingDown(commentEl.rating.id)) }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </button>
                                <i className="small text-muted mb-0 ms-2 user-select-none">{commentEl.created_at}</i>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default CommentsBlock;

