import axios from "@/util/axios";
import {
  setLoading,
  setFlagsList,
  deleteFlag,
} from "../slices/shift-flag.slice";

export const fetchShiftFlags = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.get(`/shift-flag/list`);
    dispatch(setFlagsList(data.list));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const createShiftFlag = (payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.post(`/shift-flag/create`, payload);
    dispatch(fetchShiftFlags());
    onSuccess && onSuccess();
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateShiftFlag = (id, payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.patch(`/shift-flag/update/${id}`, payload);
    dispatch(fetchShiftFlags());
    onSuccess && onSuccess();
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteShiftFlag = (id, onSuccess = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`/shift-flag/delete/${id}`);
    dispatch(deleteFlag(id));
    onSuccess && onSuccess();
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
};
