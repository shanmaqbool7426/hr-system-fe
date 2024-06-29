
import axios from '@/util/axios';
import { setLoading, pushAcademic, setAcademic, removeAcademic } from '../slices/employee.slice'

export const CreateAcademic = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/employees/academic-history/create`, payload)
        onSuccess && onSuccess()
        dispatch(pushAcademic(data.academic))
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateAcademic = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/employees/academic-history/update/${id}`, payload)
        onSuccess && onSuccess()
        dispatch(setAcademic(data.academic))
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteAcademic = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/employees/academic-history/delete/${id}`)
        dispatch(removeAcademic(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
