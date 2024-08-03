import { useState } from 'react'
import axios from 'axios';

function AddVideoModal(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);

    function submit(e) {
        if (name !== "" && description !== "" && video != null) {
            let formReq = new FormData();
            formReq.append("name", name);
            formReq.append("description", description);
            formReq.append("videoFile", video);
            e.target.innerHTML = 'Загрузка <span class="spinner-border spinner-border-sm" aria-hidden="true"></span></>'
            axios({
                method: "post",
                url: "http://localhost:8080/api/video",
                data: formReq,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((response) => {
                    console.log(response);
                    window.location.reload();
                    //todo сделать что бы не обновлялась страница
                    
                })
                .catch((response) => {
                    console.error(response);
                });

        } else {
            err();
        }
    }

    function err() {

    }

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
                            <input required value={name} onChange={(e) => setName(e.target.value)} className="form-control form-control-lg mb-2" name="name" placeholder="Введите название видео" type="text" />
                            <div className="form-floating mb-2">
                                <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="descArea" name="description"></textarea>
                                <label htmlFor="descArea">Описание</label>
                            </div>
                            <input required onChange={(e) => setVideo(e.target.files[0])} className="form-control form-control-lg mb-3" name="file" type="file" accept="video/*" />
                            <button onClick={submit} className="btn btn-lg btn-primary submit-vid">Опубликовать</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVideoModal;