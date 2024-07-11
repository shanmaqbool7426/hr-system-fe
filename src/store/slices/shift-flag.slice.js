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
      state.flags_list = action.payload.list;
    },
    setFlag(state, action) {
      let index = state.flags_list.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) state.flags_list[index] = action.payload;
    },
    removeFlag(state, action) {
      state.flags_list = state.flags_list.filter(
        (item) => item._id !== action.payload
      );
    },
    pushFlag(state, action) {
      state.flags_list.push(action.payload);
    },
  },
});

export const {
  setLoading,
  setFlagsList,
  setFlag,
  removeFlag,
  pushFlag,
} = shiftFlagSlice.actions;

export default shiftFlagSlice.reducer;
