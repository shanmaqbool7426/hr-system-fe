import { createSlice } from "@reduxjs/toolkit";

export const leaverequestSlice = createSlice({
  name: "leaverequest",
  initialState: {
    is_loading: false,
    leave_requests: [],
  },
  reducers: {
    setLoading(state, action) {
      state.is_loading = action.payload;
    },
    setLeaverequestList(state, action) {
      state.leave_requests = action.payload;
    },
    setLeaverequest(state, action) {
      let index = state.leave_requests.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) state.leave_requests[index] = action.payload;
    },
    removeLeaverequest(state, action) {
      state.leave_requests = state.leave_requests.filter(
        (item) => item._id !== action.payload
      );
    },
    pushLeaverequest(state, action) {
      state.leave_requests.push(action.payload);
    },
  },
});

export const {
  setLoading,
  setLeaverequestList,
  setLeaverequest,
  removeLeaverequest,
  pushLeaverequest,
} = leaverequestSlice.actions;

export default leaverequestSlice.reducer;
