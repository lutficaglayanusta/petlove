import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./operations";

interface NewsItem {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
}

interface NewsState {
  items: NewsItem[];
  totalPages: number;
  page: number;
  perPage: number;
}
const initialState: NewsState = {
  items: [],
  totalPages: 0,
  page: 0,
  perPage: 0,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.items = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
      })
  },
});
export default newsSlice.reducer;
