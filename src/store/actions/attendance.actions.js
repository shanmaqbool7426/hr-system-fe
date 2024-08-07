import axios from "@/util/axios";
import { setLoading, setAttendanceList ,setTodayAttendance  } from "../slices/attendance.slice";

export const FetchAttendance = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const query = new URLSearchParams(payload).toString();
    const data = await axios.get(`/attendance/list?${query}`);
    dispatch(setAttendanceList(data.list));
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const TimSheetAction = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const data = await axios.post('/attendance/check-in',payload);  
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const todaysAttendance = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const data = await axios.post('/attendance/todays-attendance',payload);  
    console.log(data , "attendance data")
    dispatch(setTodayAttendance(data?.attendace));  
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};