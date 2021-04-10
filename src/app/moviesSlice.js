import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getMovies = async (query, page) => {
  let url;
  if (query) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=d7a3a18bf1f75a32e20a4c21012ba47b&language=en-US&page=${page}&include_adult=false&query=${query}`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=d7a3a18bf1f75a32e20a4c21012ba47b&language=en-US&page=${page}`;
  }
  const results = await axios.get(url);
  return results;
};

const initialState = {
  status: 'idle',
  results: [],
  query: '',
  page: 1,
  totalPages: 1,
};

export const getMoviesAsync = createAsyncThunk(
  'movies/getMovies',
  async ({ query, page = 1 }) => {
    const response = await getMovies(query, page);
    return {
      results: response.data.results,
      page: response.data.page,
      totalPages: response.data.total_pages,
      query,
    };
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearMovieResults: (state, action) => {
      state.query = '';
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMoviesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getMoviesAsync.fulfilled, (state, action) => {
        const { results, page, totalPages, query } = action.payload;
        state.status = 'idle';
        if (page > 1) {
          state.results = [...state.results, ...results];
        } else {
          state.results = results;
        }
        state.page = page;
        state.query = query;
        state.totalPages = totalPages;
      });
  },
});


export const { setQuery } = moviesSlice.actions;

export default moviesSlice.reducer;
