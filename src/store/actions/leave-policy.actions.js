
import axios from '@/util/axios';
import { setLoading, setLeavepolicy, setLeavepolicyList, removeLeavepolicy, pushLeavepolicy } from '../slices/leave-policy.slice'

export const FetchLeavePolicies = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/leaves/list?${query}`)
        dispatch(setLeavepolicyList(data))
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateLeavePolicy = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/leaves/create`, payload)
        dispatch(pushLeavepolicy(data.leave))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateLeavePolicy = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/leaves/update/${id}`, payload)
        dispatch(setLeavepolicy(data.leave))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeletePolicy = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/leaves/delete/${id}`)
        dispatch(removeLeavepolicy(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
