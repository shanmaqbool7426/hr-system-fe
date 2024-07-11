import {
  setLoading,
  setHolidaysList,
  setHoliday,
  removeHoliday,
  pushHoliday,
} from "../slices/gazetteholiday.slice";

export const CreateGazetteHoliday = (payload, onSuccess = null) => async (
  dispatch
) => {
  try {
    dispatch(setLoading(true));
    const data = await axios.post(`/gazette-holidays/create`, payload);
    dispatch(pushHoliday(data.holiday));
    onSuccess && onSuccess();
    return true;
  } catch (err) {
    console.error("Error creating gazette holiday:", err);
  } finally {
    dispatch(setLoading(false));
  }
};
