import axios from "@/util/axios";
import {
  setLoading,
  setFlagsList,
  setFlag,
  removeFlag,
  pushFlag,
} from "../slices/shift-flag.slice";

export const FetchShiftFlags = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const query = new URLSearchParams(payload).toString();
    const data = await axios.get(`/shift-flag/list${query}`);
    dispatch(setFlagsList(data));
    return true;
  } catch (err) {
    console.error("Error fetching shift flags:", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const CreateShiftFlag = (payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.post(`/shift-flag/create`, payload);
    dispatch(pushFlag(data.flag));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.error("Error creating shift flag:", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const UpdateShiftFlag = (id, payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.patch(`/shift-flag/update/${id}`, payload);
    dispatch(setFlag(data.flag));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.error("Error updating shift flag:", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const DeleteShiftFlag = (id, onSuccess = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`/shift-flag/delete/${id}`);
    dispatch(removeFlag(id));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.error("Error deleting shift flag:", err);
  } finally {
    dispatch(setLoading(false));
  }
};
