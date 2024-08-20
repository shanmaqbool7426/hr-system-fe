import { createSlice } from "@reduxjs/toolkit";

export const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        is_loading: false,
        employees_list: [],
        employee_details: null,
        change_request_list: [],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setEmployeesList(state, action) {
            state.employees_list = action.payload.list
        },
        setChangeRequestList(state, action) {
            state.change_request_list = action.payload.list
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
        pushChangeRequest(state, action) {
            state.change_request_list.push(action.payload)
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
        setDocument(state, action) {
            let index = state.employee_details.documents.findIndex(item => item._id === action.payload._id)
            state.employee_details.documents[index] = action.payload
        },
        pushDocument(state, action) {
            if (!state.employee_details.documents) {
                state.employee_details.documents = []
            }
            state.employee_details.documents.push(action.payload)
        },
        removeDocument(state, action) {
            state.employee_details.documents = state.employee_details.documents.filter(item => item._id !== action.payload)
        },
        setWarning(state, action) {
            let index = state.employee_details.warnings.findIndex(item => item._id === action.payload._id)
            state.employee_details.warnings[index] = action.payload
        },
        pushWarning(state, action) {
            if (!state.employee_details.warnings) {
                state.employee_details.warnings = []
            }
            state.employee_details.warnings.push(action.payload)
        },
        removeWarning(state, action) {
            state.employee_details.warnings = state.employee_details.warnings.filter(item => item._id !== action.payload)
        },
    },
});

export const {
    setLoading,
    setEmployeesList,
    setChangeRequestList,
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
    setDocument,
    pushDocument,
    removeDocument,
    setWarning,
    pushWarning,
    removeWarning,
    pushChangeRequest
} = employeeSlice.actions;

export default employeeSlice.reducer;




