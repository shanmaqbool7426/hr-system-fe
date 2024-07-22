import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: "task",
    initialState: {
        is_loading: false,
        task_list: [],
        task_details: null,
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setTaskList(state, action) {
            state.task_list = action.payload.list
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
    setTask,
    removeTask,
    pushTask,
   } = taskSlice.actions;

export default taskSlice.reducer;
