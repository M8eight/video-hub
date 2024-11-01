import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./slices/video/videoSlice";
import favoriteReducer from "./slices/favorite/favoriteSlice";
import currentVideoReducer from "./slices/currentVideo/currentVideoSlice";
import commentReducer from "./slices/comment/commentSlice";

export default configureStore({
    reducer: {
        video: videoReducer,
        favorite: favoriteReducer,
        currentVideo: currentVideoReducer,
        comment: commentReducer
    }
})