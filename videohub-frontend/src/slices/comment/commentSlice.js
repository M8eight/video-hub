import { createSlice } from "@reduxjs/toolkit";
import { getComments, createComment, commentRatingUp, commentRatingDown } from "./commentRequests";

const initialState = {
    comments: [],
    commentsLoading: false,
    commentError: null,

    addCommentLoading: false,
    addCommentError: null
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getComments.pending, (state) => {
            state.commentsLoading = true;
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.commentsLoading = false;
        });

        builder.addCase(createComment.pending, (state) => {
            state.addCommentLoading = true;
        });
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.comments = [action.payload, ...state.comments];
            state.addCommentLoading = false;
        });

        builder.addCase(commentRatingUp.fulfilled, (state, action) => {
            state.comments = state.comments.map((comment) => {
                return comment.rating.id === action.payload.id ? { ...comment, rating: action.payload } : comment;
            });
        });
        builder.addCase(commentRatingDown.fulfilled, (state, action) => {
            state.comments = state.comments.map((comment) => {
                return comment.rating.id === action.payload.id ? { ...comment, rating: action.payload } : comment;
            });
        });
    }
});

export default commentSlice.reducer;