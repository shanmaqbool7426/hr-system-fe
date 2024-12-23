import axios from "@/util/axios";
import {
  setLoading,
  setResignationList,
  pushResignation,
  updateResignation,
  removeResignation,
} from "../slices/employee.slice";

export const FetchResignationList = (onSuccess = null) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const data = await axios.get(`/employee-resignations/list`);
    dispatch(setResignationList(data.list));
    onSuccess && onSuccess()
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false))
  }
};

export const CreateResignation = (payload, onSuccess = null) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const data = await axios.post(`/employee-resignations/create`, payload);
    dispatch(pushResignation(data.resignation));
    onSuccess && onSuccess()
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false))
  }
};

export const UpdateResignation = (id, payload, onSuccess = null) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const data = await axios.patch(`/employee-resignations/update/${id}`, payload);
    dispatch(updateResignation(data.resignation));
    onSuccess && onSuccess()
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false))
  }
};

export const DeleteResignation = (id, onSuccess = null) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    await axios.delete(`/employee-resignations/delete/${id}`);
    dispatch(removeResignation(id));
    onSuccess && onSuccess()
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false))
  }
};

export const ApproveResignation = (id, payload, onSuccess = null) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const data = await axios.patch(`/employee-resignations/approve/${id}`, payload);
    dispatch(updateResignation(data.resignation));
    onSuccess && onSuccess()
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false))
  }
};

export const RejectResignation = (id, payload, onSuccess = null) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const data = await axios.patch(`/employee-resignations/reject/${id}`, payload);
    dispatch(updateResignation(data.resignation));
    onSuccess && onSuccess()
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false))
  }
};
