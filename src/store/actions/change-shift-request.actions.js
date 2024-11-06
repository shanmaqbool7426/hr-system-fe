
import axios from '@/util/axios';
import { setLoading, setRequests, setRequest, pushRequest } from '../slices/change-shift-request.slice.js'

export const FetchChangeShiftRequests = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/change-shift-requests/list?${query}`)
        dispatch(setRequests(data.list))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateChangeShiftRequest = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/change-shift-requests/create`, payload)
        dispatch(pushRequest(data.request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateChangeShiftRequest = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/change-shift-requests/update/${id}`, payload)
        dispatch(setRequest(data.request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const UpdateChangeShiftRequestStatus = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/change-shift-requests/update-status/${id}`, payload)
        dispatch(setRequest(data.request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const RevertChangeShiftRequest = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/change-shift-requests/revert/${id}`)
        dispatch(setRequest(data.request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

