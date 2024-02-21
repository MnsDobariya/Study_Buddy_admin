import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    resourceList :[],
}

export const resourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    setResourceList: (state, action) => {
        state.resourceList = action.payload;
  }},
});

// this is for dispatch
export const { setResourceList } = resourceSlice.actions;

// this is for configureStore
export default resourceSlice.reducer;