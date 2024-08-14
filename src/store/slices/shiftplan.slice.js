import { createSlice } from "@reduxjs/toolkit";

export const shiftplanSlice = createSlice({
  name: "shiftplan",
  initialState: {
    is_loading: false, 
    shiftplandata:[]
  },
  reducers: {
    setLoading(state, action) {
      state.is_loading = action.payload;
    }, 
    setShiftplandata(state, action) {
      state.shiftplandata = action.payload;
    },
  },
});

export const {
  setLoading,
  setShiftplandata
 
} = shiftplanSlice.actions;

export default shiftplanSlice.reducer;
