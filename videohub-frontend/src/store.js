import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./slices/video/videoSlice";

export default configureStore({
    reducer: {
        video: videoReducer
    }
})