import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

export const getComments = createAsyncThunk(
    "comment/getComments",
    async (videoId) => {
        return await request("get", `/api/video/${videoId}/comments`).then((res) => res.data);
    }
);

export const createComment = createAsyncThunk(
    "comment/createComment",
    async ({videoId, text}) => {
        return await request("post", `/api/video/${videoId}/comment/new`, {text}, { "Content-Type": "multipart/form-data" }).then((res) => res.data);
    }
);

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
    async (id) => {
        return await request("delete", `/api/comment/${id}`).then((res) => res.data);
    }
)

export const commentRatingUp = createAsyncThunk(
    "comment/commentRatingUp",
    async (id) => {
        return await request("post", `/api/rating/${id}/up`).then((res) => res.data);
    }
);

export const commentRatingDown = createAsyncThunk(
    "comment/commentRatingDown",
    async (id) => {
        return await request("post", `/api/rating/${id}/down`).then((res) => res.data);
    }
);