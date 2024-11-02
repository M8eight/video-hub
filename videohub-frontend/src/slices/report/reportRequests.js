import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

export const getReports = createAsyncThunk(
    "report/getReports",
    async ({offset, limit}) => {
        return await request("get", `/api/report/all?offset=${offset}&limit=${limit}`).then((res) => res.data);
    }
)

export const addReport = createAsyncThunk(
    "report/addReport",
    async (reportForm) => {
        return await request("post", "/api/report", reportForm, { "Content-Type": "multipart/form-data" }).then((response) => response.data);
    }
);