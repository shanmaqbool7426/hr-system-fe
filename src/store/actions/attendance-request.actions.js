
import axios from '@/util/axios';
import { setLoading, setRequestList, setRequest, pushRequest, deleteRequest } from '../slices/attendance-request.slice'

export const FetchRequests = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/attendance-requests/list?${query}`)
        dispatch(setRequestList(data))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateRequest = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/attendance-requests/create`, payload)
        dispatch(pushRequest(data.request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateRequest = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/attendance-requests/update/${id}`, payload)
        dispatch(setRequest(data.request))
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
        await axios.delete(`/attendance-requests/delete/${id}`)
        dispatch(deleteRequest(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

