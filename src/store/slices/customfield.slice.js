import { createSlice } from "@reduxjs/toolkit";

export const customfieldSlice = createSlice({
    name: "customfield",
    initialState: {
        is_loading: false,
        customfield_list: [],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setCustomfieldList(state, action) {
            state.customfield_list = action.payload.list
        },
        setCustomfield(state, action) {
            let index = state.customfield_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.customfield_list[index] = action.payload
        },
        removeCustomfield(state, action) {
            state.customfield_list = state.customfield_list.filter((item) => item._id !== action.payload)
        },
        pushCustomfield(state, action) {
            state.customfield_list.push(action.payload)
        },
    },
});

export const {
    setLoading,
    setCustomfieldList,
    setCustomfield,
    removeCustomfield,
    pushCustomfield,
} = customfieldSlice.actions;

export default customfieldSlice.reducer;
