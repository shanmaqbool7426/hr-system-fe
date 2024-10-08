import { createSlice } from "@reduxjs/toolkit";

export const remoteCategorySlice = createSlice({
    name: "remotecategory",
    initialState: {
        is_loading: false,
        category_list: []
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload;
        },
        setCategories(state, action) {
            state.category_list = action.payload;
        },
        pushCategory(state, action) {
            state.category_list.push(action.payload);
        },
        setCategory(state, action) {
            let index = state.category_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.category_list[index] = action.payload
        },
        removeCategory(state, action) {
            state.category_list = state.category_list.filter((item) => item._id !== action.payload)
        },
    },
});

export const {
    setLoading,
    setCategories,
    setCategory,
    pushCategory,
    removeCategory
} = remoteCategorySlice.actions;

export default remoteCategorySlice.reducer;
