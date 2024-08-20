
import axios from '@/util/axios';
import { pushChangeRequest, setChangeRequestList, setLoading } from '../slices/employee.slice'


export const FetchChangeRequests = (payload) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const query = new URLSearchParams(payload).toString();
        const data = await axios.get(`/employees/change-requests?${query}`);
        dispatch(setChangeRequestList(data));
        return true;
    } catch (err) {
        console.error(err);
    } finally {
        dispatch(setLoading(false));
    }
};

export const ChangeDesignation = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const { changeRequest } = await axios.post(`/employees/change-requests/designation`, payload)
        dispatch(pushChangeRequest(changeRequest))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error(err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const ChangeDepartment = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const { changeRequest } = await axios.post(`/employees/change-requests/department`, payload)
        dispatch(pushChangeRequest(changeRequest))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error(err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const ChangeEmployeeCode = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const { changeRequest } = await axios.post(`/employees/change-requests/employee-code`, payload)
        dispatch(pushChangeRequest(changeRequest))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error(err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const ChangeSalary = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const { changeRequest } = await axios.post(`/employees/change-requests/salary`, payload)
        dispatch(pushChangeRequest(changeRequest))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error(err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const ChangeGrade = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const { changeRequest } = await axios.post(`/employees/change-requests/grade`, payload)
        dispatch(pushChangeRequest(changeRequest))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error(err); }
    finally {
        dispatch(setLoading(false))
    }
};
export const ChangeLineManager = (payload, onSuccess = null) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const { changeRequest } = await axios.post(`/employees/change-requests/line-manager`, payload)
        dispatch(pushChangeRequest(changeRequest))
        onSuccess && onSuccess()
        return true
    } catch (err) { console.error(err); }
    finally {
        dispatch(setLoading(false))
    }
};