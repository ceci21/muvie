import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getMovies = async (query, page) => {
  const key = process.env.REACT_APP_API_KEY;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=${page}&include_adult=false&query=${query}`;
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMovies = (state) => state.movies.results;
export const selectQuery = (state) => state.movies.query;
export const selectPage = (state) => state.movies.page;
export const selectTotalPages = (state) => state.movies.totalPages;
export const selectStatus = (state) => state.movies.status;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default moviesSlice.reducer;
