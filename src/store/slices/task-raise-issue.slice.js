import { createSlice } from "@reduxjs/toolkit";

export const taskRaiseIssueSlice = createSlice({
  name: "taskraiseissue",
  initialState: {
    is_loading: false,
    raise_issue_list: [],
  },
  reducers: {
    setLoading(state, action) {
      state.is_loading = action.payload;
    },
    pushRaiseIssue(state, action) {
      state.raise_issue_list.push(action.payload);
    },
  },
});
export const {
    setLoading,
    pushRaiseIssue
} = taskRaiseIssueSlice.actions;

export default taskRaiseIssueSlice.reducer;
