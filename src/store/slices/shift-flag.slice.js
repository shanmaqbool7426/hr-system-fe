import { createSlice } from "@reduxjs/toolkit";

export const shiftFlagSlice = createSlice({
  name: "shiftflag",
  initialState: {
    is_loading: false,
    flags_list: [],
  },
  reducers: {
    setLoading(state, action) {
      state.is_loading = action.payload;
    },
    setFlagsList(state, action) {
      state.flags_list = action.payload;
    },
    deleteFlag(state, action) {
      state.flags_list = state.flags_list.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { setLoading, setFlagsList, deleteFlag } = shiftFlagSlice.actions;

export default shiftFlagSlice.reducer;
