import { createSlice } from "@reduxjs/toolkit";
import ls from 'localstorage-slim';  

export const attendanceSlice = createSlice({
    name: "attendance",
    initialState: {
        is_loading: false,
        attendance_list: [],
        user: ls?.get('auth_user', { decrypt: true }),  
        todayAttendance : "", 
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setAttendanceList(state, action) {
            state.attendance_list = action.payload
        },
        setUser(state, action) {
            state.user = action.payload;
        }, 
        setTodayAttendance(state, action) {
            state.todayAttendance = action.payload;
        },  
    },
});

 
export const {
    setLoading,
    setAttendanceList,
    setUser,
    setTodayAttendance, 
} = attendanceSlice.actions;

 

export default attendanceSlice.reducer;
