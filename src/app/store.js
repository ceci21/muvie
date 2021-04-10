import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../app/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});
