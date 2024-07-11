import axios from "@/util/axios";
import {
  setLoading,
  setEmployeesList,
  setEmployeeDetails,
  setEmployee,
  pushEmployee,
  removeEmployee,
} from "../slices/employee.slice";

export const FetchEmployees = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const query = new URLSearchParams(payload).toString();
    const data = await axios.get(`/employees/list?${query}`);
    dispatch(setEmployeesList(data));
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const FetchEmployeeDetails = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.get(`/employees/details/${id}`);
    dispatch(setEmployeeDetails(data.employee));
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const CreateEmployee = (payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.post(`/employees/create`, payload);
    dispatch(pushEmployee(data.employee));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const UpdateEmployee = (id, payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.patch(`/employees/update/${id}`, payload);
    dispatch(setEmployee(data.employee));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const DeleteEmployee = (id, onSuccess = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`/employees/delete/${id}`);
    dispatch(removeEmployee(id));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
