
import axios from '@/util/axios';
import { setLoading, setProjectList,setProject, removeProject, pushProject, setProjectDetails, setCompletedProjectList } from '../slices/project.slice'

export const FetchProject = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/projects/list?${query}`)
        dispatch(setProjectList(data))
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const FetchCompletedProjects = ( payload) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const query = new URLSearchParams(payload).toString();
      const data = await axios.get(`/projects/list-completed/?${query}`);
      dispatch(setCompletedProjectList(data));
      return true;
    } catch (err) {
      console.log("Error", err);
    } finally {
      dispatch(setLoading(false));
    }
  };
export const FetchProjectDetails = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.get(`/projects/details/${id}`)
        const { project, total_tasks, completed_tasks } = data;
        dispatch(setProjectDetails({ project, total_tasks, completed_tasks }));
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateProject = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/projects/create`, payload)
        dispatch(pushProject(data.project))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateProject = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/projects/update/${id}`, payload)
        dispatch(setProject(data.project))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteProject = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/projects/delete/${id}`)
        dispatch(removeProject(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
