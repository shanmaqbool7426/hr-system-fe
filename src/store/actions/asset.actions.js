
import axios from '@/util/axios';
import { setLoading, setAssetList, setAsset, pushAsset, removeAsset, setAssetHistory, setAssetDetails } from '../slices/asset.slice'

export const FetchAssetDashboard = () => new Promise(async (resolve, reject) => {
    try {
        const data = await axios.get(`/assets/dashboard`)
        resolve(data)
    } catch (err) { reject(err) }
})

export const FetchAssets = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/assets/list?${query}`)
        dispatch(setAssetList(data))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const FetchAssetsDetails = (id) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.get(`/assets/details/${id}`)
        dispatch(setAssetDetails(data.asset))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const CreateAsset = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/assets/create`, payload)
        dispatch(pushAsset(data.asset))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const UpdateAsset = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/assets/update/${id}`, payload)
        dispatch(setAsset(data.asset))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const ChangeAssetStatus = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/assets/change-status/${id}`, payload)
        dispatch(setAsset(data.asset))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const DeleteAsset = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/assets/delete/${id}`)
        dispatch(removeAsset(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const RestoreAsset = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.post(`/assets/restore/${id}`)
        dispatch(removeAsset(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const AssignAsset = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/assets/assign-asset/${id}`, payload)
        dispatch(setAsset(data.asset))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const ReturnAsset = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.patch(`/assets/return-asset/${id}`, payload)
        dispatch(setAsset(data.asset))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};

export const FetchAssetHistory = () => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.get(`/assets/history`)
        dispatch(setAssetHistory(data.list))
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
};