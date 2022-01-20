import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
    name: "globalSlice",
    initialState: {
        lang: 'English'
    },
    reducers: {
        setLang(state, action) {
            state.lang = action.payload;
        },
    }
})

export default globalSlice.reducer;
export const {
    setLang,
} = globalSlice.actions;