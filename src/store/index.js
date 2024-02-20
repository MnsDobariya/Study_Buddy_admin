import { configureStore } from '@reduxjs/toolkit';
import assignmentSlice from './slices/assignmentSlice';
import calendarSlice from './slices/calendarSlice';
import todoSlice from './slices/todoSlice';
import resourceSlice from './slices/resourceSlice';

export default configureStore({
    reducer: {
        assignment: assignmentSlice,
        calendar: calendarSlice,
        todo:todoSlice,
        resource:resourceSlice,

    },
});