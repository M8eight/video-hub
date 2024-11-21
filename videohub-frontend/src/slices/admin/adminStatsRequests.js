import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

export const getCountVideos = createAsyncThunk(
    "adminStats/getCountVideos",
    async () => {
        return await request("get", "/api/admin/count/video").then((res) => res.data);
    }
);

export const getCountComments = createAsyncThunk(
    "adminStats/getCountComments",
    async () => {
        return await request("get", "/api/admin/count/comment").then((res) => res.data);
    }
);

export const getCountUsers = createAsyncThunk(
    "adminStats/getCountUsers",
    async () => {
        return await request("get", "/api/admin/count/user").then((res) => res.data);
    }
);