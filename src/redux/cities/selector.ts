import type { RootState } from "../store";

export const selectCities = (state:RootState) => state.cities.cities;