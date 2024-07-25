import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: "task",
    initialState: {
        is_loading: false,
        task_list: [],
        task_details: null,
        overdue_task_list: [],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setTaskList(state, action) {
            state.task_list = action.payload.list
        },
        setOverdueTaskList(state, action) { 
            state.overdue_task_list = action.payload.list
            const overdueTaskIds = new Set(action.payload.list.map(task => task._id))
            state.task_list = state.task_list.filter(task => !overdueTaskIds.has(task._id))
        },
        setTask(state, action) {
            let index = state.task_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.task_list[index] = action.payload
            state.task_details = action.payload
        },
        setTaskDetails(state, action) {
            state.task_details = action.payload
        },
        removeTask(state, action) {
            state.task_list = state.task_list.filter((item) => item._id !== action.payload)
            state.overdue_task_list = state.overdue_task_list.filter((item) => item._id !== action.payload);
        },
        pushTask(state, action) {
            state.task_list.push(action.payload)
        },
    }
})

export const {
    setLoading,
    setTaskList,
    setTaskDetails,
    setOverdueTaskList,
    setTask,
    removeTask,
    pushTask,
   } = taskSlice.actions;

export default taskSlice.reducer;
