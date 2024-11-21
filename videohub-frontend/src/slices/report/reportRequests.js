import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

const getReportsRequest = async ({offset, limit}) => {
    return await request("get", `/api/report/all?offset=${offset}&limit=${limit}`).then((res) => res.data);
}

export const getReports = createAsyncThunk(
    "report/getReports",
    async ({offset, limit}) => {
        return await getReportsRequest({offset, limit})
    }
)

export const getMoreReports = createAsyncThunk(
    "report/getMoreReports",
    async ({offset, limit}) => {
        return await getReportsRequest({offset, limit})
    }
)

export const addReport = createAsyncThunk(
    "report/addReport",
    async (reportForm) => {
        return await request("post", "/api/report", reportForm, { "Content-Type": "multipart/form-data" }).then((response) => response.data);
    }
);

export const acceptReport = createAsyncThunk(
    "report/acceptReport",
    async ({reportId}) => {
        return await request("post", `/api/report/accept/${reportId}`).then((response) => response.data);
    }
);

export const ignoreReport = createAsyncThunk(
    "report/ignoreReport",
    async ({reportId}) => {
        return await request("post", `/api/report/ignore/${reportId}`).then((response) => response.data);
    }
);
