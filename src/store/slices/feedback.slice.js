import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    is_loading: false,
    feedback_list: [],
  },
  reducers: {
    setLoading(state, action) {
      state.is_loading = action.payload;
    },
    pushFeedBack(state, action) {
      state.feedback_list.push(action.payload);
    },
    setFeedBack(state, action) {
      let index = state.feedback_list.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) state.feedback_list[index] = action.payload;
    },
  },
});
export const {
    setLoading,
    pushFeedBack,
    setFeedBack
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
