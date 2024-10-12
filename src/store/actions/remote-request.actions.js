
import axios from '@/util/axios';
import { setLoading, setRequests, setRequest, pushRequest, removeRequest } from '../slices/remote-request.slice.js'
import { setEmployee } from '../slices/employee.slice.js';

export const FetchRemoteWorkRequests = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/remote-work-requests/list?${query}`)
        dispatch(setRequests(data.list))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateRemoteWorkRequest = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/remote-work-requests/create`, payload)
        dispatch(pushRequest(data.request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateRemoteWorkRequest = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/remote-work-requests/update/${id}`, payload)
        dispatch(setRequest(data.request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const UpdateRemoteRequestStatus = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/remote-work-requests/update-status/${id}`, payload)
        dispatch(setRequest(data.request))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteRemoteWorkRequest = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/remote-work-requests/delete/${id}`)
        dispatch(removeRequest(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const RevokeRemoteAccess = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/remote-work-requests/revoke/${id}`)
        onSuccess && onSuccess()
        dispatch(setEmployee(data.employee))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
