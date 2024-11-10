import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../helpers/axios_helper";

export const getUser = createAsyncThunk(
    "user/getUser",
    async ({userId}) => {
        return await request("get", "/api/user/" + userId).then((res) => res.data);
    }
);