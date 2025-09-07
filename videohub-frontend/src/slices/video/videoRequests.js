import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

const getVideosRequestWithFilter = async (dataReq) => {
    const { offset, limit, sortBy, tags } = dataReq;
    return await request("get", "/api/videos?offset=" + offset + "&limit=" + limit + "&sortBy=" + sortBy + "&tags=" + tags).then((res) => res.data);
}

//VIDEOS
export const getVideos = createAsyncThunk(
    "video/getVideos",
    async (dataReq) => {
        return await getVideosRequestWithFilter(dataReq)
    }
);

export const createVideo = createAsyncThunk(
    "video/createVideo",
    async (dataReq) => {
        return await request("post", "/api/video", dataReq, { "Content-Type": "multipart/form-data" }).then((res) => res.data);
    }
);

export const getMoreVideos = createAsyncThunk(
    "video/getMoreVideos",
    async (dataReq) => {
        return await getVideosRequestWithFilter(dataReq)
    }
);

export const getTags = createAsyncThunk(
    "video/getTags",
    async (dataReq) => {
        const { offset, limit } = dataReq
        return await request('get', '/api/video/tag/tags?offset=' + offset + '&limit=' + limit).then((res) => res.data.content)
    }
)

//CURRENT VIDEO
export const getCurrentVideo = createAsyncThunk(
    "currentVideo/getCurrentVideo",
    async (id) => {
        return await request("get", '/api/video/' + id).then((res) => res.data);
    }
)

export const videoRatingUp = createAsyncThunk(
    "currentVideo/videoRatingUp",
    async (ratingId) => {
        return await request("post", `/api/rating/${ratingId}/up`).then((res) => res.data);
    }
)

export const videoRatingDown = createAsyncThunk(
    "currentVideo/videoRatingDown",
    async (ratingId) => {
        return await request("post", `/api/rating/${ratingId}/down`).then((res) => res.data);
    }    
)

export const deleteVideo = createAsyncThunk(
    "currentVideo/deleteVideo",
    async (id) => {
        return await request("delete", "/api/video/" + id).then((res) => res.data);
    }
)

export const updateVideo = createAsyncThunk(
    "currentVideo/updateVideo",
    async (formData) => {
        return await request("put", "/api/video/edit", formData, { "Content-Type": "multipart/form-data" }).then((res) => res.data);
    }
)