import axios from "@/util/axios";
import { setLoading, setTaskList,setOverdueTaskList, setAwaitingTaskList ,setTaskDetails, setTask, removeTask, pushTask, setOverDueTask, pushNonAwaitingTask, removeAwaitingTask, setReportedTaskList, addReportedTask} from "../slices/task.slice";


export const FetchTasks = ( board_id,payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const query = new URLSearchParams(payload).toString();
      const data = await axios.get(`/tasks/list/${board_id}?${query}`);
      dispatch(setTaskList(data));
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const FetchOverDueTasks = ( payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const query = new URLSearchParams(payload).toString();
      const data = await axios.get(`/tasks/list-overdue/?${query}`);
      dispatch(setOverdueTaskList(data));
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const FetchAwaitingTasks = ( payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const query = new URLSearchParams(payload).toString();
      const data = await axios.get(`/tasks/list-awaiting/?${query}`);
      dispatch(setAwaitingTaskList(data));
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  export const FetchReportedTasks = ( payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const query = new URLSearchParams(payload).toString();
      const data = await axios.get(`/tasks/list-reported/?${query}`);
      dispatch(setReportedTaskList(data));
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  export const FetchTaskDetails = (id) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.get(`/tasks/details/${id}`);
      dispatch(setTaskDetails(data.task));
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const CreateTask = (payload, onSuccess = null) => async (
    dispatch
  ) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.post(`/tasks/create`, payload);
      dispatch(pushTask(data.task));
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const UpdateTask = (id, payload, onSuccess = null) => async (
    dispatch
  ) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.patch(`/tasks/update/${id}`, payload);
      dispatch(setTask(data.task));
      dispatch(setOverDueTask(data.task));
      if (payload.status !== 'awaiting') {
        dispatch(removeAwaitingTask(id)); 
        dispatch(pushNonAwaitingTask(data.task));
      }
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const DeleteTask = (id, onSuccess = null) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`/tasks/delete/${id}`);
      dispatch(removeTask(id));
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
  