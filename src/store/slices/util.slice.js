import { createSlice } from "@reduxjs/toolkit";
export const utilSlice = createSlice({
    name: "util",
    initialState: {
        is_loading: false
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        }
    },
});

export const {
    setLoading
} = utilSlice.actions;

export default utilSlice.reducer;
