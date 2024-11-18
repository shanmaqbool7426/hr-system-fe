import { createSlice } from "@reduxjs/toolkit";

export const onboardingoffboardingSlice = createSlice({
    name: "onboardingoffboarding",
    initialState: {
        is_loading: false,
        onboarding_tasks: [],
        exit_clearance_tasks: [],
        onboarding_assets: [],
        onboarding_employees: []
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setOnboardingTasks(state, action) {
            state.onboarding_tasks = action.payload
        },
        pushOnboardingTask(state, action) {
            state.onboarding_tasks.push(action.payload)
        },
        updateOnboardingTask(state, action) {
            let index = state.onboarding_tasks.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.onboarding_tasks[index] = action.payload
        },
        removeOnboardingTask(state, action) {
            state.onboarding_tasks = state.onboarding_tasks.filter((item) => item._id !== action.payload)
        },
        setExitClearanceTasks(state, action) {
            state.exit_clearance_tasks = action.payload
        },
        pushExitClearanceTask(state, action) {
            state.exit_clearance_tasks.push(action.payload)
        },
        updateExitClearanceTask(state, action) {
            let index = state.exit_clearance_tasks.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.exit_clearance_tasks[index] = action.payload
        },
        removeExitClearanceTask(state, action) {
            state.exit_clearance_tasks = state.exit_clearance_tasks.filter((item) => item._id !== action.payload)
        },
        setAssets(state, action) {
            state.onboarding_assets = action.payload
        },
        pushAsset(state, action) {
            state.onboarding_assets.push(action.payload)
        },
        updateAsset(state, action) {
            let index = state.onboarding_assets.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.onboarding_assets[index] = action.payload
        },
        removeAsset(state, action) {
            state.onboarding_assets = state.onboarding_assets.filter((item) => item._id !== action.payload)
        },
        setOnboardingEmployees(state, action) {
            state.onboarding_employees = action.payload
        }
    },
});

export const {
    setLoading,
    setOnboardingTasks,
    pushOnboardingTask,
    updateOnboardingTask,
    removeOnboardingTask,
    setExitClearanceTasks,
    pushExitClearanceTask,
    updateExitClearanceTask,
    removeExitClearanceTask,
    setAssets,
    pushAsset,
    updateAsset,
    removeAsset,
    setOnboardingEmployees
} = onboardingoffboardingSlice.actions;

export default onboardingoffboardingSlice.reducer;
