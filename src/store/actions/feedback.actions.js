
import axios from '@/util/axios';
import { pushFeedBack, setLoading, setFeedBack } from '../slices/feedback.slice';

export const CreateFeedBack = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/feedback/create`, payload)
        dispatch(pushFeedBack(data.feedback))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const UpdateFeedBack = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const data = await axios.patch(`/feedback/update/${id}`, payload);
      dispatch(setFeedBack(data.feedback));
      onSuccess && onSuccess();
      return true;
    } catch (err) {
      console.error("Error updating raise issue:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };