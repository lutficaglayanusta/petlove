import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCities = createAsyncThunk(
    "cities/fetchCities",
    async (keyword,thunkAPI) => { 
        try {
            const response = await axios.get(`/cities/?keyword=${keyword}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
        }
);
export const fetchAllCities = createAsyncThunk(
    "cities/fetchAllCities",
    async (_, thunkAPI) => { 
        try {
            const response = await axios.get("/cities/locations")
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
