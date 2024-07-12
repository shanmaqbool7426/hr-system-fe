import { createSlice } from "@reduxjs/toolkit";

export const gazetteHolidaySlice = createSlice({
  name: "gazetteholiday",
  initialState: {
    is_loading: false,
    holiday_list: [],
  },
  reducers: {
    setLoading(state, action) {
      state.is_loading = action.payload;
    },
    setHolidaysList(state, action) {
      state.holiday_list = action.payload.list;
    },
    setHoliday(state, action) {
      let index = state.holiday_list.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) state.holiday_list[index] = action.payload;
    },
    removeHoliday(state, action) {
      state.holiday_list = state.holiday_list.filter(
        (item) => item._id !== action.payload
      );
    },
    pushHoliday(state, action) {
      state.holiday_list.push(action.payload);
    },
  },
});
export const {
  setLoading,
  setHolidaysList,
  setHoliday,
  removeHoliday,
  pushHoliday,
} = gazetteHolidaySlice.actions;

export default gazetteHolidaySlice.reducer;
