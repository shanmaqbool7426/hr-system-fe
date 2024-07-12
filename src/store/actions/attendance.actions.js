import axios from "@/util/axios";
import { setLoading, setAttendanceList } from "../slices/attendance.slice";

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
