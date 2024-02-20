import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    calendarList :[],
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendarList: (state, action) => {
        state.calendarList = action.payload;
  }},
});

// this is for dispatch
export const { setCalendarList } = calendarSlice.actions;

// this is for configureStore
export default calendarSlice.reducer;