
import axios from '@/util/axios';
import { setLoading, setTickets, setTicket, pushTicket, removeTicket } from '../slices/helpdesk.slice.js'


export const FetchHelpdeskDashboard = () => new Promise(async (resolve, reject) => {
    try {
        const data = await axios.get(`/helpdesk-tickets/dashboard`)
        resolve(data)
    } catch (err) { reject(err) }
})

export const FetchHelpdeskTickets = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/helpdesk-tickets/list?${query}`)
        dispatch(setTickets(data.list))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateHelpdeskTicket = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/helpdesk-tickets/create`, payload)
        dispatch(pushTicket(data.ticket))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateHelpdeskTicket = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/helpdesk-tickets/update/${id}`, payload)
        dispatch(setTicket(data.ticket))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteHelpdeskTicket = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/helpdesk-tickets/delete/${id}`)
        dispatch(removeTicket(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CloseHelpdeskTicket = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/helpdesk-tickets/close/${id}`, payload)
        dispatch(setTicket(data.ticket))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

export const TransferHelpdeskTicket = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/helpdesk-tickets/transfer/${id}`, payload)
        dispatch(setTicket(data.ticket))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

export const AssignHelpdeskTicket = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/helpdesk-tickets/assign/${id}`, payload)
        dispatch(setTicket(data.ticket))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}