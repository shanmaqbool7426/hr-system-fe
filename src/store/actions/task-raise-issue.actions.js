
import axios from '@/util/axios';
import { pushRaiseIssue, setLoading, setRaiseIssue } from '../slices/task-raise-issue.slice';



export const CreateRaiseIssue = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/task-raise-issue/create`, payload)
        dispatch(pushRaiseIssue(data.issue))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const UpdateRaiseIssue = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.patch(`/task-raise-issue/update/${id}`, payload);
      dispatch(setRaiseIssue(data.issue));
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.error("Error updating raise issue:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };