import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchAllNews = createAsyncThunk("news/fetchAllNews", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`/news`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


export const fetchNews = createAsyncThunk("news/fetchNews", async ({ keyword, page = 1 }: { keyword?: string; page?: number }, thunkAPI) => { 
    try {

        const response = await axios.get(`/news?keyword=${keyword}&page=${page}&limit=6`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})