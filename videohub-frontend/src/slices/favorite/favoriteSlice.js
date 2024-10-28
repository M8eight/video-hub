import { createSlice } from "@reduxjs/toolkit";
import { getFavorites, createFavorite, deleteFavorite } from "./favoriteRequests";

const initialState = {
    favorites: [],
    loading: false,

    isFavorite: null
};

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: initialState,
    reducers: {
        favoriteValid: (state, action) => {
            state.isFavorite = state.favorites.forEach((favorite) => {
                if (favorite.video_id === action.payload) {
                    return true;
                }
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFavorites.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload;
            state.loading = false;
        })

        builder.addCase(createFavorite.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createFavorite.fulfilled, (state, action) => {
            state.favorites.push(action.payload);
            state.isFavorite = true;
            state.loading = false;
        })
        builder.addCase(createFavorite.rejected, (state) => {
            state.loading = false;
        })

        builder.addCase(deleteFavorite.pending, (state) => {    
            state.loading = true;
        })
        builder.addCase(deleteFavorite.fulfilled, (state, action) => {
            state.favorites = state.favorites.filter((favorite) => favorite.video_id !== action.payload);
            state.isFavorite = false;
            state.loading = false;
        })
        builder.addCase(deleteFavorite.rejected, (state) => {
            state.loading = false;
        })
    }
});

export default favoriteSlice.reducer;

export const { favoriteValid } = favoriteSlice.actions;