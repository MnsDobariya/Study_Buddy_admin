import { createSlice } from '@reduxjs/toolkit';

let initialState = {
    todoList :[],
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodoList: (state, action) => {
        state.todoList = action.payload;
  }},
});

// this is for dispatch
export const { setTodoList } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;