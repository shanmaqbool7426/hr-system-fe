import axios from "@/util/axios";
import { pushShift, removeShift, setLoading, setShift, setShifts } from "../slices/shiftplan.slice.js";

export const CreateShift = (payload, onSuccess = null) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.post(`/shift-plans/create`, payload);
      dispatch(pushShift(data.shift))
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const FetchShifts = (payload, onSuccess) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.get(`/shift-plans/list`, payload);    
    dispatch(setShifts(data.list));
    onSuccess && onSuccess()
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const UpdateShift = (id, payload, onSuccess = null) =>
  async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.patch(`/shift-plans/update/${id}`, payload);
      dispatch(setShift(data.shift));
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const DeleteShift = (id, onSuccess) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`/shift-plans/delete/${id}`);
    dispatch(removeShift(id))
    onSuccess && onSuccess()
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

