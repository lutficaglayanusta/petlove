import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type NoticeData = {
      keyword?: string;
      category?: string;
      species?: string;
      locationId?: number;
      byDate?: boolean;
      byPrice?: boolean;
      byPopularity?: boolean;
      page?: number;
      sex?: string;
    }

export const fetchNotices = createAsyncThunk(
  "notices/fetchNotices",
  async (
    {
      keyword,
      category,
      species,
      locationId,
      byDate,
      byPrice,
      byPopularity,
      page = 1,
      sex,
    }: NoticeData,
    thunkAPI,
  ) => {
    try {
      const params = new URLSearchParams();
      
      if (keyword) params.append("keyword", keyword);
      if (category) params.append("category", category);
      if (species) params.append("species", species);
      if (locationId) params.append("locationId", locationId.toString());
      if (byDate !== undefined && byDate) params.append("byDate", "true");
      if (byPrice !== undefined) params.append("byPrice", byPrice.toString());
      if (byPopularity !== undefined) params.append("byPopularity", byPopularity.toString());
      if (sex) params.append("sex", sex);
      
      params.append("page", page.toString());
      params.append("limit", "6");

      const response = await axios.get(`/notices?${params.toString()}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const fetchNoticesCategories = createAsyncThunk(
    "notices/fetchNoticesCategories",
    async (_, thunkAPI) => { 
        try {
            const response = await axios.get("/notices/categories");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const fetchNoticesSex = createAsyncThunk(
    "notices/fetchNoticesSex", async (_, thunkAPI) => { 
        try {
            const response = await axios.get("/notices/sex");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
}
);
export const fetchNoticesSpecies = createAsyncThunk(
    "notices/fetchNoticesSpecies", async (_, thunkAPI) => { 
        try {
            const response = await axios.get("/notices/species");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const addNoticeToFavorites = createAsyncThunk(
    "notices/addNoticeToFavorites",
    async (noticeId: string, thunkAPI) => {
        try {
            await axios.post(`/notices/favorites/add/${noticeId}`);
            const response = await axios.get(`/notices/${noticeId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const removeNoticeFromFavorites = createAsyncThunk(
    "notices/removeNoticeFromFavorites",
    async (noticeId: string, thunkAPI) => {
        try {
            await axios.delete(`/notices/favorites/remove/${noticeId}`);
            return noticeId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);