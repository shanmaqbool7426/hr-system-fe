import {
  setLoading,
  setHolidaysList,
  setHoliday,
  removeHoliday,
  pushHoliday,
} from "../slices/gazetteholiday.slice";
import axios from "@/util/axios";

export const FetchGazettedHoliday = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const query = new URLSearchParams(payload).toString();
    const data = await axios.get(`/gazette-holidays/list?${query}`);
    dispatch(setHolidaysList(data));
    return true;
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
export const CreateGazetteHoliday = (payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.post(`/gazette-holidays/create`, payload);
    dispatch(pushHoliday(data.holiday));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.error("Error creating gazette holiday:", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const UpdateGazetteHoliday = (id, payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.patch(`/gazette-holidays/update/${id}`, payload);
    dispatch(setHoliday(data.holiday));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const DeleteHoliday = (id, onSuccess = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`/gazette-holidays/delete/${id}`);
    dispatch(removeHoliday(id));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
