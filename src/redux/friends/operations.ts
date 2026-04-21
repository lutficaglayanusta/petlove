import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchFriends = createAsyncThunk("friends/fetch", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/friends");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
