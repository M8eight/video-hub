import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

export const getFavorites = createAsyncThunk(
    "favorite/getFavorites",
    async () => {
        return await request("get", '/api/favorites').then((res) => res.data);
    }
);

export const createFavorite = createAsyncThunk(
    "favorite/createFavorite",
    async (videoId) => {
        return await request("post", "/api/favorites/" + videoId, {}, {responseType: 'text'}).then((res) => res.data);
    }
);

export const deleteFavorite = createAsyncThunk(
    "favorite/deleteFavorite",
    async (videoId) => {
        return await request("delete", "/api/favorites/" + videoId, {}, { responseType: 'text' }).then((res) => res.data);
    }
);