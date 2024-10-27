import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

const getVideosRequestWithFilter = async (dataReq) => {
    const { offset, limit, sortBy, tags } = dataReq;
    console.log(dataReq)
    return await request("get", "/api/videos?offset=" + offset + "&limit=" + limit + "&sortBy=" + sortBy + "&tags=" + tags).then((res) => res.data);
}

export const getCurrentVideo = createAsyncThunk(
    "currentVideo/getCurrentVideo",
    async (id) => {
        return await request("get", '/api/video/' + id).then((res) => res.data);
    }
)

export const deleteVideo = createAsyncThunk(
    "video/deleteVideo",
    async (id) => {
        return await request("delete", "/api/video/" + id).then((res) => res.data);
    }
)

export const getVideos = createAsyncThunk(
    "video/getVideos",
    async (dataReq) => {
        return await getVideosRequestWithFilter(dataReq)
    }
);

export const createVideo = createAsyncThunk(
    "video/createVideo",
    async (dataReq) => {
        console.log(dataReq);
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

