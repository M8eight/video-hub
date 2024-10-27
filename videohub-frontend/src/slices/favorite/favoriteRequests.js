import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

export const getFavorites = createAsyncThunk(
    "favorite/getFavorites",
    async () => {
        return await request("get", '/api/favorites/get').then((res) => res.data);
    }
);