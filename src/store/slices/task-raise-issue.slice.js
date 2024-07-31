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
    setRaiseIssue(state, action) {
      let index = state.raise_issue_list.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) state.raise_issue_list[index] = action.payload;
    },
  },
});
export const {
    setLoading,
    pushRaiseIssue,
    setRaiseIssue
} = taskRaiseIssueSlice.actions;

export default taskRaiseIssueSlice.reducer;
