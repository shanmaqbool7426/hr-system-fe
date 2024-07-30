import { createSlice } from "@reduxjs/toolkit";

export const departmentSlice = createSlice({
    name: "department",
    initialState: {
        is_loading: false,
        departments_list: [],
        total_records: 0,
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setDepartmentsList(state, action) {
            state.departments_list = action.payload.list
            state.total_records = action.payload.total
        },
        setDepartment(state, action) {
            let index = state.departments_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.departments_list[index] = action.payload
        },
        removeDepartment(state, action) {
            state.departments_list = state.departments_list.filter((item) => item._id !== action.payload)
        },
        pushDepartment(state, action) {
            state.departments_list.push(action.payload)
        },
    },
});

export const {
    setLoading,
    setDepartmentsList,
    setDepartment,
    removeDepartment,
    pushDepartment,
} = departmentSlice.actions;

export default departmentSlice.reducer;
