import axios from "@/util/axios";
import {
  setLoading,
  pushDocument,
  setDocument,
  removeDocument,
} from "../slices/employee.slice";

export const CreateDocument = (payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.post(
      `/employees/document/create`,
      payload
    );
    onSuccess && onSuccess();
    dispatch(pushDocument(data.document));
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const UpdateDocument = (id, payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.patch(
      `/employees/document/update/${id}`,
      payload
    );
    onSuccess && onSuccess();
    dispatch(setDocument(data.document));
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};

export const DeleteDocument = (id, onSuccess = null) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await axios.delete(`/employees/document/delete/${id}`);
    dispatch(removeDocument(id));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.log("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};
