
import axios from '@/util/axios';
import { setLoading, setLeaverequest, setLeaverequestList, removeLeaverequest, pushLeaverequest } from '../slices/leave-request.slice'

export const FetchLeaveRequests = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/leave-requests/list?${query}`)
        dispatch(setLeaverequestList(data))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateLeaveRequest = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/leave-requests/create`, payload)
        dispatch(pushLeaverequest(data.leave_request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateLeaveRequest = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/leave-requests/update/${id}`, payload)
        dispatch(setLeaverequest(data.leave_request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteRequest = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/leave-requests/delete/${id}`)
        dispatch(removeLeaverequest(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
