import { createSlice } from "@reduxjs/toolkit";

export const requestSlice = createSlice({
    name: "attendancerequest",
    initialState: {
        is_loading: false,
        request_list: [],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setRequestList(state, action) {
            state.request_list = action.payload
        },
        setRequest(state, action) {
            const index = state.request_list.findIndex(item => item.id === action.payload.id)
            if (index !== -1) {
                state.request_list[index] = action.payload
            }
        },
        pushRequest(state, action) {
            state.request_list.push(action.payload)
        },
        deleteRequest(state, action) {
            state.request_list = state.request_list.filter(item => item.id !== action.payload)
        }
    },
});


export const {
    setLoading,
    setRequestList,
    setRequest,
    pushRequest,
    deleteRequest
} = requestSlice.actions;



export default requestSlice.reducer;
