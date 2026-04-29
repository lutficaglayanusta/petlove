import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}
const clearAuthHeader = () => {
     axios.defaults.headers.common.Authorization = "";
}

export const login = createAsyncThunk("auth/login", async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
        const response = await axios.post("/users/signin", credentials);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const register = createAsyncThunk("auth/register", async (credentials: { name: string; email: string; password: string }, thunkAPI) => {
    try {
        const response = await axios.post("/users/signup", credentials);
        setAuthHeader(response.data.token);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        await axios.post("/users/signout");
        clearAuthHeader();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const refreshUser = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {

    console.log(thunkAPI.getState())

    const state: any = thunkAPI.getState() 
    const token = state.auth.token; 

    if (!token) {
        return thunkAPI.rejectWithValue("No token found");
    }

    try {
        setAuthHeader(token);

        const response = await axios.get("/users/current");
        
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});