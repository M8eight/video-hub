
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentVideo, videoRatingUp, videoRatingDown, deleteVideo } from "../video/videoRequests";

const initialState = {
    id: null,
    name: null,
    description: null,

    duration: null,
    rating: null,
    tags: null,
    user: null,
    views: 0,

    updated_at: null,
    created_at: null,

    video_path: null,
    preview_path: null,
    comments: [],

    loading: false,
};

const currentVideoSlice = createSlice({
    name: 'currentVideo',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        // GET VIDEOS
        builder.addCase(getCurrentVideo.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getCurrentVideo.fulfilled, (state, action) => {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.description = action.payload.description;
            state.duration = action.payload.duration;
            state.rating = action.payload.rating;
            state.tags = action.payload.tags;
            state.user = action.payload.user;
            state.views = action.payload.views;
            state.updated_at = action.payload.updated_at;
            state.created_at = action.payload.created_at;
            state.video_path = action.payload.video_path;
            state.preview_path = action.payload.preview_path;
            state.comments = action.payload.comments;
            state.loading = false;
        })
        builder.addCase(getCurrentVideo.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        })

        builder.addCase(videoRatingUp.fulfilled, (state, action) => {
            state.rating = action.payload;
        })
        builder.addCase(videoRatingDown.fulfilled, (state, action) => {
            state.rating = action.payload;
        })

        builder.addCase(deleteVideo.fulfilled, (state) => {
            state = initialState;
        })
    },
})


export default currentVideoSlice.reducer;