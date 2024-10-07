
import axios from '@/util/axios';
import { setLoading, setTeams, setTeam, pushTeam, removeTeam } from '../slices/remote-team.slice.js'

export const FetchRemoteTeams = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/remote-teams/list?${query}`)
        dispatch(setTeams(data.list))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateRemoteTeam = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/remote-teams/create`, payload)
        dispatch(pushTeam(data.team))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateRemoteTeam = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/remote-teams/update/${id}`, payload)
        dispatch(setTeam(data.team))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteRemoteTeam = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/remote-teams/delete/${id}`)
        dispatch(removeTeam(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};
