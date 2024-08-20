import axios from "@/util/axios";
import { setLoading, setAttendanceList ,setTodayAttendance ,setBreakTimeStart, setLastBreak ,setCheckoutAttendance,setGetBreaksByAttendance} from "../slices/attendance.slice";

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

export const CheckIn = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const data = await axios.post('/attendance/check-in');  
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const todaysAttendance = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const data = await axios.post('/attendance/todays-attendance');    
    dispatch(setTodayAttendance(data?.attendace));  
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const startBreak = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));  
    const data = await axios.post(`/attendance/start-break/${id}`);   
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
    const breaksArray = data?.attendance || [];
    const lastBreak = breaksArray.length > 0 ? breaksArray.at(-1) : null;
    dispatch(setLastBreak(lastBreak)) 
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};