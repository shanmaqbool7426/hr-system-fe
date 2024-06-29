
import axios from '@/util/axios';
import { setLoading, setCustomfield, setCustomfieldList, removeCustomfield, pushCustomfield } from '../slices/customfield.slice'

export const FetchCustomfields = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/custom-fields/list?${query}`)
        dispatch(setCustomfieldList(data))
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateCustomfield = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/custom-fields/create`, payload)
        dispatch(pushCustomfield(data.custom_field))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateCustomfield = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/custom-fields/update/${id}`, payload)
        dispatch(setCustomfield(data.custom_field))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteCustomfield = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/custom-fields/delete/${id}`)
        dispatch(removeCustomfield(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.log("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
