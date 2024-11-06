import { createSlice } from "@reduxjs/toolkit";

export const changeShiftRequestSlice = createSlice({
    name: "changeshiftrequest",
    initialState: {
        is_loading: false,
        request_list: []
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload;
        },
        setRequests(state, action) {
            state.request_list = action.payload;
        },
        pushRequest(state, action) {
            state.request_list.push(action.payload);
        },
        setRequest(state, action) {
            let index = state.request_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.request_list[index] = action.payload
        },
        removeRequest(state, action) {
            state.request_list = state.request_list.filter((item) => item._id !== action.payload)
        },
    },
});

export const {
    setLoading,
    setRequests,
    setRequest,
    pushRequest,
    removeRequest
} = changeShiftRequestSlice.actions;

export default changeShiftRequestSlice.reducer;