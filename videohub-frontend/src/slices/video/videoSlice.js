import { createSlice } from "@reduxjs/toolkit";
import { getVideos, getMoreVideos, getTags } from "./videoRequests";

const initialState = {
    videos: [],
    tags: [],
    loading: false,
    error: null,

    first: null,
    empty: null,
    last: null,
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getVideos.fulfilled, (state, action) => {
            state.videos = action.payload.content;
            
            state.first = action.payload.first;
            state.last = action.payload.last;
            state.empty = action.payload.empty;

            state.loading = false;
        })
        builder.addCase(getVideos.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        })


        builder.addCase(getMoreVideos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMoreVideos.fulfilled, (state, action) => {
            state.videos = [...state.videos, ...action.payload.content];
            
            state.first = action.payload.first;
            state.last = action.payload.last;
            state.empty = action.payload.empty;
            state.loading = false;
        })
        builder.addCase(getMoreVideos.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        })
        

        builder.addCase(getTags.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getTags.fulfilled, (state, action) => {
            state.tags = action.payload;
            state.loading = false;
        })
    },
})


export default videoSlice.reducer;