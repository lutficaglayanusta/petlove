import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";

export const login = createAsyncThunk("auth/login", async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
        const response = await axios.post("/users/signin", credentials);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const register = createAsyncThunk("auth/register", async (credentials: { name: string; email: string; password: string }, thunkAPI) => {
    try {
        const response = await axios.post("/users/signup", credentials);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.post("/users/signout");
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/users/current");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});