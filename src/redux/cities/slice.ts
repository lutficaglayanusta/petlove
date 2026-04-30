import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCities, fetchCities } from "./operation";

interface City {
  _id: string;
  useCounty: string;
  stateEn: string;
  cityEn: string;
  countyEn: string;
}
interface CitiesState {
  cities: City[];
}

const initialState: CitiesState = {
  cities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchAllCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      });
  },
});

export default citiesSlice.reducer;
