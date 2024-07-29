
import axios from '@/util/axios';
import { pushRaiseIssue, setLoading } from '../slices/task-raise-issue.slice';



export const CreateRaiseIssue = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/task-raise-issue/create`, payload)
        dispatch(pushRaiseIssue(data.issue))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
