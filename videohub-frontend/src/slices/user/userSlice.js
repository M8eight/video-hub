import { createSlice } from "@reduxjs/toolkit";
import { getUser, resetPassword, getUsers, getMoreUsers } from "./userRequests";

const initialState = {
    user: {},
    loading: false,

    resetPasswordState: null,
    editAvatarState: null,

    users: [],
    usersLoading: false,
    usersIsLast: false
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => { 
        builder.addCase(getUser.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        })

        builder.addCase(resetPassword.pending, (state) => {
            state.resetPasswordState = "pending";
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.user = action.payload;
            state.resetPasswordState = "fulfilled";
        })
        builder.addCase(resetPassword.rejected, (state) => {
            state.resetPasswordState = "rejected";
        })

        builder.addCase(getUsers.pending, (state) => {
            state.usersLoading = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = [...state.users, ...action.payload.content];
            state.usersIsLast = action.payload.last;
            state.usersLoading = false;
        })
    }
});

export default userSlice.reducer;