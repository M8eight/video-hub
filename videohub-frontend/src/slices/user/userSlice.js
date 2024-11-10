import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "./userRequests";

const initialState = {
    user: {},
    loading: false,
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
    }
});

export default userSlice.reducer;