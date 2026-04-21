import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { login, register, logout,refreshUser } from "./operations";


interface AuthState {
    isAuthenticated: boolean;
    user: {
        name: string | null;
        email: string | null;
    };
    isRefreshing: boolean;
    token: string | null;
}


const initialState: AuthState = {
    isAuthenticated: false,
    user: {
        name: null,
        email: null,
    },
    isRefreshing: false,
    token: null,
};



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<{ user: { name: string; email: string }; token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(logout.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = { name: null, email: null };
            state.token = null;
        });
        builder.addCase(register.fulfilled, (state, action: PayloadAction<{ user: { name: string; email: string }; token: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(refreshUser.pending, (state) => {
            state.isRefreshing = true;
        });
        builder.addCase(refreshUser.fulfilled, (state, action: PayloadAction<{ name: string; email: string }>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.isRefreshing = false;
        });
        builder.addCase(refreshUser.rejected, (state) => {
            state.isRefreshing = false;
        });
    },
});

export default authSlice.reducer;