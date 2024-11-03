
import { createSlice } from "@reduxjs/toolkit";
import { getReports, addReport, getMoreReports } from "./reportRequests";

const initialState = {
    reports: [],
    loading: false,
    isCreate: false,
    error: null,

    first: null,
    empty: null,
    last: null,
};

const reportSlice = createSlice({
    name: 'report',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => { 
        builder.addCase(getReports.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getReports.fulfilled, (state, action) => {
            state.reports = action.payload.content;

            state.first = action.payload.first;
            state.last = action.payload.last;
            state.empty = action.payload.empty;

            state.loading = false;
        });
        builder.addCase(getReports.rejected, (state, action) => {
            state.error = true;
            state.loading = false;
        });
        
        builder.addCase(getMoreReports.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMoreReports.fulfilled, (state, action) => {
            state.reports = [...state.reports, ...action.payload.content];

            state.first = action.payload.first;
            state.last = action.payload.last;
            state.empty = action.payload.empty;

            state.loading = false;
        });

        builder.addCase(addReport.pending, (state) => {
            console.log('pending');
            state.loading = true;
        });
        builder.addCase(addReport.fulfilled, (state, action) => {
            console.log('fulfilled');
            state.isCreate = true;
            state.loading = false;
        });
    }
});

export default reportSlice.reducer;