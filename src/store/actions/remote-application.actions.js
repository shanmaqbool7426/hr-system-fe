
import axios from '@/util/axios';
import { setLoading, setApplications, setApplication, pushApplication, removeApplication } from '../slices/remote-application.slice.js'

export const FetchRemoteApplications = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/remote-applications/list?${query}`)
        dispatch(setApplications(data.list))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateRemoteApplications = (payload, onSuccess) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/remote-applications/update`, payload)
        dispatch(setApplications(data.list))
        onSuccess && onSuccess()
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

