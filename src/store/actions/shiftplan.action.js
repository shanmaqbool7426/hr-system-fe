import axios from "@/util/axios";
import {
  setLoading,
  setShiftplandata
} from "../slices/shiftplan.slice.js";

 
export const CreateShiftplan = (payload, onSuccess = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.post(`/shift-plan/create`, payload); 
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.error("Error creating shift plan:", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const fetchShiftplan = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.get(`/shift-plan/list`, payload); 
    dispatch(setShiftplandata(data)); 
    return true;
  } catch (err) {
    console.error("Error creating shift plan:", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const DeleteShiftplan = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.delete(`/shift-plan/delete/${id}`);  
    return true;
  } catch (err) {
    console.error("Error deleting shift plan:", err);
  } finally {
    dispatch(setLoading(false));
  }
};