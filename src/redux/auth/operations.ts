import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";


type UserData = {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
};
type PetData = {
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
};

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
export const fetchUserInfo = createAsyncThunk(
  "users/fetchUserInfo",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/users/current/full");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const updateUserInfo = createAsyncThunk(
  "users/updateUserInfo",
  async (userData: UserData, thunkAPI) => {
    try {
      const response = await axios.patch("/users/current/edit", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const addPet = createAsyncThunk(
  "users/addPet",
  async (petData: PetData, thunkAPI) => {
    try {
      const response = await axios.post("/users/current/pets/add", petData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);