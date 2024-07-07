import { createSlice } from "@reduxjs/toolkit";

export const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        is_loading: false,
        attendance_list: [],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setAttendanceList(state, action) {
            state.attendance_list = action.payload
        },
    },
});

export const {
    setLoading,
    setAttendanceList,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
