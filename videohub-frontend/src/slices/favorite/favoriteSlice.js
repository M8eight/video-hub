import { createSlice } from "@reduxjs/toolkit";
import { getFavorites } from "./favoriteRequests";

const initialState = {
    favorites: [],
    loading: false,
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => { 
        builder.addCase(getFavorites.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload;
            state.loading = false;
        })
    }
});

export default favoriteSlice.reducer;