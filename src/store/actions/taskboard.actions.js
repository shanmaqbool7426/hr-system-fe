import axios from "@/util/axios";
import { setLoading,setTaskBoard,setTaskBoardList,setTaskBoardDetails,removeTaskBoard,pushTaskBoard } from "../slices/taskboard.slice";



export const FetchProjectTaskBoards = (project_id,payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const query = new URLSearchParams(payload).toString();
    const data = await axios.get(`/task-boards/list/${project_id}?${query}`);
    dispatch(setTaskBoardList(data));
    return true;
  } catch (err) {
    console.error("Error", err);
  } finally {
    dispatch(setLoading(false));
  }
};


export const FetchTaskBoards = (payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const query = new URLSearchParams(payload).toString();
      const data = await axios.get(`/task-boards/list/?${query}`);
      dispatch(setTaskBoardList(data));
      return true;
    } catch (err) {
      console.error("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const FetchTaskBoardDetails = (id) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.get(`/task-boards/details/${id}`);
      dispatch(setTaskBoardDetails(data.board));
      return true;
    } catch (err) {
      console.error("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const CreateTaskBoard = (payload, onSuccess = null) => async (
    dispatch
  ) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.post(`/task-boards/create`, payload);
      dispatch(pushTaskBoard(data.board));
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.error("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const UpdateTaskBoard = (id, payload, onSuccess = null) => async (
    dispatch
  ) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.patch(`/task-boards/update/${id}`, payload);
      dispatch(setTaskBoard(data.board));
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.error("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const DeleteTaskBoard = (id, onSuccess = null) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`/task-boards/delete/${id}`);
      dispatch(removeTaskBoard(id));
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.error("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  