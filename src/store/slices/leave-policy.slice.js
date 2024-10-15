import { createSlice } from "@reduxjs/toolkit";

export const leavepolicySlice = createSlice({
    name: "leavepolicy",
    initialState: {
        is_loading: false,
        leave_policies: [],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setLeavepolicyList(state, action) {
            state.leave_policies = action.payload.list
        },
        setLeavepolicy(state, action) {
            let index = state.leave_policies.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.leave_policies[index] = action.payload
        },
        removeLeavepolicy(state, action) {
            state.leave_policies = state.leave_policies.filter((item) => item._id !== action.payload)
        },
        pushLeavepolicy(state, action) {
            state.leave_policies.push(action.payload)
        },
    },
});

export const {
    setLoading,
    setLeavepolicyList,
    setLeavepolicy,
    removeLeavepolicy,
    pushLeavepolicy,
} = leavepolicySlice.actions;

export default leavepolicySlice.reducer;
