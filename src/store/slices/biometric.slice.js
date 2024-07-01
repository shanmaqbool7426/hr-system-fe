import { createSlice } from "@reduxjs/toolkit";

export const biometricSlice = createSlice({
    name: "biometric",
    initialState: {
        is_loading: false,
        device_list: [],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setDevicesList(state, action) {
            state.device_list = action.payload.list
        },
        setDevice(state, action) {
            let index = state.device_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.device_list[index] = action.payload
        },
        removeDevice(state, action) {
            state.device_list = state.device_list.filter((item) => item._id !== action.payload)
        },
        pushDevice(state, action) {
            state.device_list.push(action.payload)
        }
    },
});

export const {
    setLoading,
    setDevicesList,
    setDevice,
    removeDevice,
    pushDevice,
} = biometricSlice.actions;

export default biometricSlice.reducer;
