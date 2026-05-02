import { createSlice } from "@reduxjs/toolkit";
import { fetchNotices, fetchNoticesCategories, fetchNoticesSex, fetchNoticesSpecies } from "./operation";

type Item = {
    _id: string;
    species: string;
    category: string;
    price: string;
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
}


interface NoticeState {
    items: Item[];
    categories: string[];
    sexs: string[];
    species: string[];
    page: number;
    totalPages: number;
    perPage: number;
}

const initialState: NoticeState = {
    items: [],
    categories: [],
    sexs: [],
    species: [],
    page: 0,
    totalPages: 0,
    perPage: 0,
};



const noticesSlice = createSlice({
    name: "notices",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotices.fulfilled, (state, action) => {
            state.items = action.payload.results;
            state.page = action.payload.page;
            state.totalPages = action.payload.totalPages;
            state.perPage = action.payload.perPage;
        })
            .addCase(fetchNoticesCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchNoticesSex.fulfilled, (state, action) => { 
                state.sexs = action.payload;
            })
            .addCase(fetchNoticesSpecies.fulfilled, (state, action) => {
                state.species = action.payload;
            });
    }
});

export default noticesSlice.reducer;