import { createSlice } from "@reduxjs/toolkit";

export const taskBoardSlice = createSlice({
    name: "taskboard",
    initialState: {
        is_loading: false,
        taskboard_list: [],
        taskboard_details: null,
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setTaskBoardList(state, action) {
            state.taskboard_list = action.payload.list
        },
        setTaskBoard(state, action) {
            let index = state.taskboard_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.taskboard_list[index] = action.payload
            state.taskboard_details = action.payload
        },
        setTaskBoardDetails(state, action) {
            state.taskboard_details = action.payload
        },
        removeTaskBoard(state, action) {
            state.taskboard_list = state.taskboard_list.filter((item) => item._id !== action.payload)
        },
        pushTaskBoard(state, action) {
            state.taskboard_list.push(action.payload)
        },
    }
})

export const {
    setLoading,
    setTaskBoardList,
    setTaskBoardDetails,
    setTaskBoard,
    removeTaskBoard,
    pushTaskBoard,
   } = taskBoardSlice.actions;

export default taskBoardSlice.reducer;
