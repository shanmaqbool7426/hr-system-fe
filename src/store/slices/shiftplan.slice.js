import { createSlice } from "@reduxjs/toolkit";

export const shiftSlice = createSlice({
  name: "shift",
  initialState: {
    is_loading: false,
    shift_list: []
  },
  reducers: {
    setLoading(state, action) {
      state.is_loading = action.payload;
    },
    setShifts(state, action) {
      state.shift_list = action.payload;
    },
    pushShift(state, action) {
      state.shift_list.push(action.payload);
    },
    setShift(state, action) {
      let index = state.shift_list.findIndex((item) => item._id === action.payload._id)
      if (index !== -1)
        state.shift_list[index] = action.payload
    },
    removeShift(state, action) {
      state.shift_list = state.shift_list.filter((item) => item._id !== action.payload)
  },
  },
});

export const {
  setLoading,
  setShifts,
  setShift,
  pushShift,
  removeShift
} = shiftSlice.actions;

export default shiftSlice.reducer;
