import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

export const videoRatingUp = createAsyncThunk(
    "currentVideo/videoRatingUp",
    async (id) => {
        return await request("post", '/api/rating/' + id + "/up").then((res) => res.data);
    }
);

export const videoRatingDown = createAsyncThunk(
    "currentVideo/videoRatingDown",
    async (id) => {
        return await request("post", '/api/rating/' + id + "/down").then((res) => res.data);
    }
);