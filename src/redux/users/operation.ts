import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
export const deletePet = createAsyncThunk(
  "users/deletePet",
  async (petId: string, thunkAPI) => { 
    try {
      const response = await axios.delete(`/users/current/pets/remove/${petId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

