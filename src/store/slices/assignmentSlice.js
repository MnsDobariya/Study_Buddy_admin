import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    assignmentList :[],
}

export const assignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    setAssignmentList: (state, action) => {
        state.assignmentList = action.payload;
  }},
});

// this is for dispatch
export const { setAssignmentList } = assignmentSlice.actions;

// this is for configureStore
export default assignmentSlice.reducer;