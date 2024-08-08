import axios from "@/util/axios";
import { setLoading, setAttendanceList ,setTodayAttendance ,setBreakTimeStart ,setCheckoutAttendance,setGetBreaksByAttendance} from "../slices/attendance.slice";

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
    dispatch(setTodayAttendance(data?.attendace));  
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const startBreak = (payload , id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const data = await axios.post(`/attendance/start-break/${id}`,payload);   
    dispatch(setBreakTimeStart(data?.attendance_break))
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const endBreak = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const data = await axios.post(`/attendance/end-break/${id}`);   
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const checkOut = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const data = await axios.post(`/attendance/check-out/${id}`);  
    console.log(data , "hello");
     
    dispatch(setCheckoutAttendance(data?.attendance))
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const getBreaks = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));   
    
    const data = await axios.get(`/attendance/get-breaks/${id}`);  
      
    dispatch(setGetBreaksByAttendance(data?.attendance))
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};