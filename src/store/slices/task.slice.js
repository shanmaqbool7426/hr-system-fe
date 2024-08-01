import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: "task",
    initialState: {
        is_loading: false,
        task_list: [],
        completed_task_list:[],
        task_details: null,
        overdue_task_list: [],
        awaiting_task_list: [],
        reported_task_list:[],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setTaskList(state, action) {
            state.task_list = action.payload.list
        },
        setCompletedTaskList(state, action) { 
            state.completed_task_list = action.payload.list
        },
        setOverdueTaskList(state, action) { 
            state.overdue_task_list = action.payload.list
        },
        setAwaitingTaskList(state, action) { 
            state.awaiting_task_list = action.payload.list
        },
        setReportedTaskList(state, action) { 
            state.reported_task_list = action.payload.list
        },
        setTask(state, action) {
            let index = state.task_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.task_list[index] = action.payload
            state.task_details = action.payload
        },
        setOverDueTask(state, action) {
            let index = state.overdue_task_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.overdue_task_list[index] = action.payload
            state.task_details = action.payload
        },
        setTaskDetails(state, action) {
            state.task_details = action.payload
        },
        removeAwaitingTask(state, action) {
            state.awaiting_task_list = state.awaiting_task_list.filter((item) => item._id !== action.payload);
        },
        removeTask(state, action) {
            state.task_list = state.task_list.filter((item) => item._id !== action.payload)
            state.overdue_task_list = state.overdue_task_list.filter((item) => item._id !== action.payload);
        },
        pushTask(state, action) {
            state.awaiting_task_list.push(action.payload)
        },
    }
})

export const {
    setLoading,
    setTaskList,
    setTaskDetails,
    setCompletedTaskList,
    setOverdueTaskList,
    setAwaitingTaskList,
    setReportedTaskList,
    removeAwaitingTask,
    setTask,
    setOverDueTask,
    removeTask,
    pushTask,
   } = taskSlice.actions;

export default taskSlice.reducer;
