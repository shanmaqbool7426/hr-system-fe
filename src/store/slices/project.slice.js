import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: "project",
    initialState: {
        is_loading: false,
        project_list: [],
        project_detail: null,
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setProjectList(state, action) {
            state.project_list = action.payload.list; 
        },
        setProject(state, action) {
            let index = state.project_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.project_list[index] = action.payload
            state.project_detail = action.payload

        },
        setProjectDetails(state, action) {
            state.project_detail = action.payload;
        },
        removeProject(state, action) {
            state.project_list = state.project_list.filter((item) => item._id !== action.payload)
        },
        pushProject(state, action) {
            state.project_list.push(action.payload)
        },
       
        
    },
});

export const {
    setLoading,
    setProjectList,
    setProject,
    removeProject,
    pushProject,
    setProjectDetails,
    
} = projectSlice.actions;

export default projectSlice.reducer;




