
import axios from '@/util/axios';
import { setLoading } from '../slices/employee.slice'

export const ChangeDesignation = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.post(`/employees/change-requests/designation`, payload)
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
