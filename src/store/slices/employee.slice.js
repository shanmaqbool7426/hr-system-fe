import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        is_loading: false,
        employees_list: [],
        employee_details: null,
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setEmployeesList(state, action) {
            state.employees_list = action.payload.list
        },
        setEmployee(state, action) {
            let index = state.employees_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.employees_list[index] = action.payload
            state.employee_details = action.payload
        },
        setEmployeeDetails(state, action) {
            state.employee_details = action.payload
        },
        removeEmployee(state, action) {
            state.employees_list = state.employees_list.filter((item) => item._id !== action.payload)
        },
        pushEmployee(state, action) {
            state.employees_list.push(action.payload)
        },
        setAcademic(state, action) {
            let index = state.employee_details.academicsHistory.findIndex(item => item._id === action.payload._id)
            state.employee_details.academicsHistory[index] = action.payload
        },
        pushAcademic(state, action) {
            if (!state.employee_details.academicsHistory) {
                state.employee_details.academicsHistory = []
            }
            state.employee_details.academicsHistory.push(action.payload)
        },
        removeAcademic(state, action) {
            state.employee_details.academicsHistory = state.employee_details.academicsHistory.filter(item => item._id !== action.payload)
        },
        setJobExperience(state, action) {
            let index = state.employee_details.jobExperiences.findIndex(item => item._id === action.payload._id)
            state.employee_details.jobExperiences[index] = action.payload
        },
        pushJobExperience(state, action) {
            if (!state.employee_details.jobExperiences) {
                state.employee_details.jobExperiences = []
            }
            state.employee_details.jobExperiences.push(action.payload)
        },
        removeJobExperience(state, action) {
            state.employee_details.jobExperiences = state.employee_details.jobExperiences.filter(item => item._id !== action.payload)
        },
    },
});

export const {
    setLoading,
    setEmployeesList,
    setEmployee,
    removeEmployee,
    pushEmployee,
    setEmployeeDetails,
    setAcademic,
    pushAcademic,
    removeAcademic,
    setJobExperience,
    pushJobExperience,
    removeJobExperience,
} = employeeSlice.actions;

export default employeeSlice.reducer;
