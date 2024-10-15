import { createSlice } from "@reduxjs/toolkit";

export const remoteApplicationSlice = createSlice({
    name: "remoteapplication",
    initialState: {
        is_loading: false,
        application_list: []
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload;
        },
        setApplications(state, action) {
            state.application_list = action.payload;
        },
        pushApplication(state, action) {
            state.application_list.push(action.payload);
        },
        setApplication(state, action) {
            let index = state.application_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.application_list[index] = action.payload
        },
        removeApplication(state, action) {
            state.application_list = state.application_list.filter((item) => item._id !== action.payload)
        },
    },
});

export const {
    setLoading,
    setApplications,
    setApplication,
    pushApplication,
    removeApplication
} = remoteApplicationSlice.actions;

export default remoteApplicationSlice.reducer;
