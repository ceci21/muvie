import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../components/MovieSection/moviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});
