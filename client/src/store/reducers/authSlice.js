import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        user: {},
        isAuth: false,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setAuth(state, action) {
            state.isAuth = action.payload;
        }
    }
})

export default authSlice.reducer;
export const {
    setUser,
    setAuth,
} = authSlice.actions;