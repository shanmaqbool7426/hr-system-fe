
import axios from '@/util/axios';
import {
    setLoading,
    setOnboardingTasks,
    setExitClearanceTasks,
    setAssets,
    pushOnboardingTask,
    pushExitClearanceTask,
    removeOnboardingTask,
    removeExitClearanceTask,
    updateOnboardingTask,
    updateExitClearanceTask,
    pushAsset,
    updateAsset,
    removeAsset,
    setOnboardingEmployees
} from '../slices/onboarding-offboarding.slice'



export const FetchSettings = (onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.get(`/onboarding-offboarding/settings`)
        dispatch(setOnboardingTasks(data?.onboarding_tasks || []))
        dispatch(setExitClearanceTasks(data?.offboarding_tasks || []))
        dispatch(setAssets(data?.onboarding_assets || []))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}


export const CreateOnboardingTask = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/onboarding-offboarding/tasks/onboarding/create`, payload)
        dispatch(pushOnboardingTask(data.task))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

export const UpdateOnboardingTask = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/onboarding-offboarding/tasks/onboarding/update/${id}`, payload)
        dispatch(updateOnboardingTask(data.task))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

export const DeleteOnboardingTask = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/onboarding-offboarding/tasks/onboarding/delete/${id}`)
        dispatch(removeOnboardingTask(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

export const CreateOffboardingTask = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/onboarding-offboarding/tasks/offboarding/create`, payload)
        dispatch(pushExitClearanceTask(data.task))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

export const UpdateOffboardingTask = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/onboarding-offboarding/tasks/offboarding/update/${id}`, payload)
        dispatch(updateExitClearanceTask(data.task))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

export const DeleteOffboardingTask = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/onboarding-offboarding/tasks/offboarding/delete/${id}`)
        dispatch(removeExitClearanceTask(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}

export const CreateOnboardingAsset = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/onboarding-offboarding/assets/create`, payload)
        dispatch(pushAsset(data.asset))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}
export const UpdateOnboardingAsset = (id, payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const data = await axios.post(`/onboarding-offboarding/assets/update/${id}`, payload)
        dispatch(updateAsset(data.asset))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}
export const DeleteOnboardingAsset = (id, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        await axios.delete(`/onboarding-offboarding/assets/delete/${id}`)
        dispatch(removeAsset(id))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error("Error", err); }
    finally {
        dispatch(setLoading(false))
    }
}
export const GetOnboardingEmployees = () => async (dispatch) => {
    try {
        const data = await axios.get(`/onboarding-offboarding/employees/onboarding`)
        dispatch(setOnboardingEmployees(data.employees))
    } catch (err) { console.error("Error", err); }
}