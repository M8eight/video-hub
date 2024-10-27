import { createSlice } from "@reduxjs/toolkit";
import { getVideos, getMoreVideos, createVideo, getTags, deleteVideo } from "./videoRequests";

const initialState = {
    videos: [],
    tags: [],
    loading: false,
    error: null,

    first: null,
    empty: null,
    last: null,

    isCreate: false,
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // GET VIDEOS
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


        // GET MORE VIDEOS
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

    
        // CREATE VIDEO
        builder.addCase(createVideo.pending, (state) => {
            state.isCreate = false;
            state.loading = true;
        })
        builder.addCase(createVideo.fulfilled, (state, action) => {
            state.videos = [action.payload, ...state.videos];
            state.isCreate = true;
            state.loading = false;
        })


        // GET TAGS
        builder.addCase(getTags.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getTags.fulfilled, (state, action) => {
            state.tags = action.payload;
            state.loading = false;
        })

        
        // DELETE VIDEO
        builder.addCase(deleteVideo.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(deleteVideo.fulfilled, (state, action) => {
            state.videos = state.videos.filter(video => video.id !== action.payload);
            state.loading = false;
        })
    },
})


export default videoSlice.reducer;