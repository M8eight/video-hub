import { useRef, useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { getCurrentVideo, updateVideo } from "../../../slices/video/videoRequests";

export default function EditVideo() {
    const [editedVideoData, setEditedVideoData] = useState({
        name: "",
        description: ""
    });
    const [videoTags, setVideoTags] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [tagInput, setTagInput] = useState("");
    const [saveError, setSaveError] = useState(null);
    const [hasChanges, setHasChanges] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentVideo = useSelector((state) => state.currentVideo);
    const { id } = useParams();
    const videoRef = useRef();

    useEffect(() => {
        dispatch(getCurrentVideo(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (currentVideo?.id) {
            const initialData = {
                name: currentVideo.name || "",
                description: currentVideo.description || ""
            };
            setEditedVideoData(initialData);
            setVideoTags(currentVideo.tags?.map(tag => tag.text) || []);
            setTagInput(currentVideo.tags?.map(tag => tag.text).join(', ') || '');
        }
    }, [currentVideo]);

    // Отслеживание изменений
    useEffect(() => {
        if (!currentVideo?.id) return;
        
        const nameChanged = editedVideoData.name !== (currentVideo.name || "");
        const descChanged = editedVideoData.description !== (currentVideo.description || "");
        const tagsChanged = JSON.stringify(videoTags.sort()) !== 
                           JSON.stringify((currentVideo.tags?.map(tag => tag.text) || []).sort());
        const previewChanged = !!previewImage;
        
        setHasChanges(nameChanged || descChanged || tagsChanged || previewChanged);
    }, [editedVideoData, videoTags, previewImage, currentVideo]);

    const generatePreview = () => {
        if (!videoRef.current) return;

        const canvas = document.createElement("canvas");
        const video = videoRef.current;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);
        
        setPreviewImage(canvas.toDataURL("image/jpeg", 0.8));
    };

    const clearPreview = () => {
        setPreviewImage(null);
    };

    const base64ToBlob = (base64String, mimeType) => {
        const byteCharacters = atob(base64String.split(',')[1]);
        const byteArray = new Uint8Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArray[i] = byteCharacters.charCodeAt(i);
        }
        
        return new Blob([byteArray], { type: mimeType });
    };

    const handleSave = async () => {
        setSaveError(null);
        
        if (!editedVideoData.name.trim()) {
            setSaveError("Название видео не может быть пустым");
            return;
        }

        const formData = new FormData();
        formData.append('id', currentVideo.id);
        formData.append('name', editedVideoData.name.trim());
        formData.append('description', editedVideoData.description.trim());
        formData.append('videoTags', videoTags.join(','));

        if (previewImage) {
            const mimeType = previewImage.substring(
                previewImage.indexOf(':') + 1, 
                previewImage.indexOf(';')
            );
            const blob = base64ToBlob(previewImage, mimeType);
            formData.append('previewFile', blob, 'preview.jpg');
        }

        try {
            await dispatch(updateVideo(formData)).unwrap();
            navigate(`/video/${currentVideo.id}`, { replace: true });
        } catch (error) {
            setSaveError("Ошибка при сохранении видео. Попробуйте еще раз.");
            console.error('Ошибка при сохранении видео:', error);
        }
    };

    const handleTagsChange = (e) => {
        const value = e.target.value;
        setTagInput(value);
        
        const tags = value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag !== "");
        setVideoTags(tags);
    };

    const addTag = (tagText) => {
        if (!tagText.trim() || videoTags.includes(tagText.trim())) return;
        
        const newTags = [...videoTags, tagText.trim()];
        setVideoTags(newTags);
        setTagInput(newTags.join(', '));
    };

    const removeTag = (tagToRemove) => {
        const newTags = videoTags.filter(tag => tag !== tagToRemove);
        setVideoTags(newTags);
        setTagInput(newTags.join(', '));
    };

    const handleInputChange = (field, value) => {
        setEditedVideoData(prev => ({ ...prev, [field]: value }));
        setSaveError(null);
    };

    const handleCancel = () => {
        if (hasChanges) {
            if (window.confirm("У вас есть несохраненные изменения. Вы уверены, что хотите выйти?")) {
                navigate(`/video/${currentVideo.id}`);
            }
        } else {
            navigate(`/video/${currentVideo.id}`);
        }
    };

    const isLoading = currentVideo?.loading;
    const videoPath = currentVideo?.video_path;
    const previewPath = currentVideo?.preview_path;

    if (!currentVideo && !isLoading) {
        return (
            <Fragment>
                <Header currentTab="videos" />
                <div className="container">
                    <div className="alert alert-danger mt-4" role="alert">
                        Видео не найдено
                    </div>
                </div>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Header currentTab="videos" />
            
            <div className="container py-4">
                {/* Заголовок с breadcrumb */}
                <div className="row mb-4">
                    <div className="col">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <button className="btn btn-link p-0" onClick={() => navigate('/videos')}>
                                        Видео
                                    </button>
                                </li>
                                <li className="breadcrumb-item">
                                    <button className="btn btn-link p-0" onClick={() => navigate(`/video/${id}`)}>
                                        {currentVideo?.name || 'Загрузка...'}
                                    </button>
                                </li>
                                <li className="breadcrumb-item active">Редактирование</li>
                            </ol>
                        </nav>
                        <h1 className="h2 mb-0">Редактирование видео</h1>
                    </div>
                </div>

                <div className="row g-4">
                    {/* Левая колонка - Видеоплеер */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-body p-3">
                                <div className="ratio ratio-16x9">
                                    <video 
                                        ref={videoRef}
                                        className="rounded" 
                                        controls
                                        crossOrigin="anonymous"
                                        poster={previewPath ? 
                                            `http://localhost:8080/media/${previewPath}` : 
                                            "http://localhost:8080/media/video_error.png"
                                        }
                                    >
                                        {videoPath && (
                                            <source 
                                                src={`http://localhost:8080/media/${videoPath}`}
                                                type='video/mp4;codecs="avc1.42E01E, mp4a.40.2"'
                                                crossOrigin="anonymous"
                                            />
                                        )}
                                    </video>
                                </div>
                            </div>
                        </div>

                        {/* Секция превью */}
                        <div className="card shadow-sm mt-4">
                            <div className="card-header">
                                <h5 className="card-title mb-0">
                                    <i className="bi bi-image me-2"></i>
                                    Превью видео
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <button 
                                            className="btn btn-outline-primary w-100" 
                                            onClick={generatePreview}
                                            disabled={!videoRef.current}
                                        >
                                            <i className="bi bi-camera me-2"></i>
                                            Создать из текущего кадра
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        {previewImage && (
                                            <button 
                                                className="btn btn-outline-secondary w-100" 
                                                onClick={clearPreview}
                                            >
                                                <i className="bi bi-trash me-2"></i>
                                                Удалить превью
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {previewImage && (
                                    <div className="mt-3">
                                        <div className="position-relative">
                                            <img 
                                                src={previewImage} 
                                                alt="Новое превью видео" 
                                                className="img-fluid rounded shadow-sm"
                                                style={{ maxHeight: '200px', width: 'auto' }}
                                            />
                                            <span className="position-absolute top-0 start-0 badge bg-success m-2">
                                                Новое
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка - Форма редактирования */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h5 className="card-title mb-0">
                                    <i className="bi bi-pencil me-2"></i>
                                    Параметры видео
                                </h5>
                            </div>
                            <div className="card-body">
                                {/* Ошибки */}
                                {saveError && (
                                    <div className="alert alert-danger alert-dismissible" role="alert">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        {saveError}
                                        <button type="button" className="btn-close" onClick={() => setSaveError(null)}></button>
                                    </div>
                                )}

                                {/* Название */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-card-text me-2"></i>
                                        Название
                                    </label>
                                    {currentVideo?.name !== undefined ? (
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={editedVideoData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="Введите название видео"
                                        />
                                    ) : (
                                        <div className="placeholder-glow">
                                            <span className="placeholder col-12 placeholder-lg" />
                                        </div>
                                    )}
                                </div>

                                {/* Описание */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-text-paragraph me-2"></i>
                                        Описание
                                    </label>
                                    {currentVideo?.description !== undefined ? (
                                        <textarea 
                                            className="form-control"
                                            rows="4"
                                            value={editedVideoData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Добавьте описание видео"
                                        />
                                    ) : (
                                        <div className="placeholder-glow">
                                            {[...Array(4)].map((_, i) => (
                                                <span key={i} className="placeholder col-12 placeholder-sm d-block mb-1" />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Теги */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-tags me-2"></i>
                                        Теги
                                    </label>
                                    
                                    {/* Отображение текущих тегов */}
                                    {videoTags.length > 0 && (
                                        <div className="mb-2">
                                            {videoTags.map((tag) => (
                                                <span key={tag} className="badge bg-secondary me-1 mb-1">
                                                    {tag}
                                                    <button 
                                                        type="button" 
                                                        className="btn-close btn-close-white ms-1" 
                                                        style={{ fontSize: '0.7rem' }}
                                                        onClick={() => removeTag(tag)}
                                                        aria-label="Удалить тег"
                                                    ></button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Введите теги через запятую"
                                        value={tagInput}
                                        onChange={handleTagsChange}
                                    />
                                    <div className="form-text">
                                        Разделяйте теги запятыми. Нажмите на крестик, чтобы удалить тег.
                                    </div>
                                </div>

                                {/* Индикатор изменений */}
                                {hasChanges && (
                                    <div className="alert alert-info py-2">
                                        <i className="bi bi-info-circle me-2"></i>
                                        <small>У вас есть несохраненные изменения</small>
                                    </div>
                                )}

                                {/* Кнопки действий */}
                                <div className="d-grid gap-2">
                                    <button 
                                        type="button" 
                                        onClick={handleSave}
                                        className="btn btn-primary"
                                        disabled={isLoading || !hasChanges}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" />
                                                Сохранение...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-lg me-2"></i>
                                                Сохранить изменения
                                            </>
                                        )}
                                    </button>
                                    
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-secondary"
                                        onClick={handleCancel}
                                        disabled={isLoading}
                                    >
                                        <i className="bi bi-x-lg me-2"></i>
                                        Отмена
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Информация о видео */}
                        {currentVideo && (
                            <div className="card shadow-sm mt-3">
                                <div className="card-header">
                                    <h6 className="card-title mb-0">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Информация
                                    </h6>
                                </div>
                                <div className="card-body py-2">
                                    <small className="text-muted">
                                        <div>ID: {currentVideo.id}</div>
                                        {currentVideo.created_at && (
                                            <div>Создано: {new Date(currentVideo.created_at).toLocaleDateString()}</div>
                                        )}
                                    </small>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}