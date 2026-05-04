// slice.ts
import { createSlice } from "@reduxjs/toolkit";
import { fetchUserInfo, updateUserInfo, addPet, deletePet } from "./operation";
import { addNoticeToFavorites, removeNoticeFromFavorites } from "../notices/operation";

type Pet = {
  _id: string;
  name: string;
  title: string;
  imgURL: string;
  species: string;
  birthday: string;
  sex: string;
  createdAt: string;
  updatedAt: string;
};

type Notice = {
  _id: string;
  species: string;
  category: string;
  price?: string;
  title: string;
  name: string;
  birthday: string;
  comment: string;
  sex: string;
  location: string;
  imgURL: string;
  createdAt: string;
  user: string;
  popularity: number;
  updatedAt: string;
};

type UserState = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  token: string;
  noticesViewed: Notice[];
  noticesFavorites: Notice[];
  pets: Pet[];
  createdAt: string;
  updatedAt: string;
};

const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  phone: "",
  token: "",
  noticesViewed: [],
  noticesFavorites: [],
  pets: [],
  createdAt: "",
  updatedAt: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(addPet.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(deletePet.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(addNoticeToFavorites.fulfilled, (state, action) => {
        state.noticesFavorites.push(action.payload);
      })
      .addCase(removeNoticeFromFavorites.fulfilled, (state, action) => {
        state.noticesFavorites = state.noticesFavorites.filter(
          (notice) => notice._id !== action.payload
        );
      });
  },
});

export default usersSlice.reducer;