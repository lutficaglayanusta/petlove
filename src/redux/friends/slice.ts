import { createSlice } from "@reduxjs/toolkit";
import { fetchFriends } from "./operations";


type Days = {
    _id: string;
    isOpen: boolean;
}

interface Friend {
    _id: string;
    title: string;
    url: string;
    addressUrl: string;
    address: string;
    imageUrl: string;
    workDays: Days[];
    phone: string;
    email: string;
}

interface FriendState {
    friendsList: Friend[];
}
const initialState: FriendState = {
    friendsList: [],
};



const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriends.fulfilled, (state, action) => {
                state.friendsList = action.payload;
            })
            
    },
})

export default friendsSlice.reducer;