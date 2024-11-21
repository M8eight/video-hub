import { createSlice } from "@reduxjs/toolkit";
import { getCountUsers, getCountComments, getCountVideos } from "./adminStatsRequests";

const initialState = {
    stats : {
        videos: 0,
        comments: 0,
        users: 0
    },
};

const adminStatsSlice = createSlice({
    name: 'adminStats',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCountVideos.fulfilled, (state, action) => {
            state.stats.videos = action.payload;
        });

        builder.addCase(getCountComments.fulfilled, (state, action) => {
            state.stats.comments = action.payload;
        });

        builder.addCase(getCountUsers.fulfilled, (state, action) => {
            state.stats.users = action.payload;
        });
    }
});

export default adminStatsSlice.reducer;