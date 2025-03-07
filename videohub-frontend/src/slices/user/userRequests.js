import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

export const getUser = createAsyncThunk(
    "user/getUser",
    async ({ userId }) => {
        return await request("get", "/api/user/" + userId).then((res) => res.data);
    }
);

export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async (passwordForm) => {
        return await request("post", "/api/user/password/reset", passwordForm, { "Content-Type": "multipart/form-data" })
    }
)

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async ({ offset, limit }) => {
        return await request("get", "/api/admin/user/users?offset=" + offset + "&limit=" + limit).then((res) => res.data);
    }
);