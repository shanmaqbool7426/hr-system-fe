import axios from "@/util/axios";
import {
  setLoading,
  pushWarning,
  setWarning,
  removeWarning,
} from "../slices/employee.slice";

export const CreateWarning = (payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.post(
      `/employees/warning/create`,
      payload
    );
    onSuccess && onSuccess();
    dispatch(pushWarning(data.warning));
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const UpdateWarning = (id, payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.patch(
      `/employees/warning/update/${id}`,
      payload
    );
    onSuccess && onSuccess();
    dispatch(setWarning(data.warning));
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const DeleteWarning = (id, onSuccess = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`/employees/warning/delete/${id}`);
    dispatch(removeWarning(id));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
