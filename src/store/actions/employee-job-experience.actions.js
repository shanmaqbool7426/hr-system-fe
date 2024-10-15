
import axios from '@/util/axios';
import { setLoading, pushJobExperience, setJobExperience, removeJobExperience } from '../slices/employee.slice'

export const CreateJobExperience = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/employees/job-experience/create`, payload)
        dispatch(pushJobExperience(data.experience))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateJobExperience = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/employees/job-experience/update/${id}`, payload)
        dispatch(setJobExperience(data.experience))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteJobExperience = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/employees/job-experience/delete/${id}`)
        dispatch(removeJobExperience(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
