import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMovies,
  getMoviesAsync,
  setQuery,
  selectQuery,
  selectPage,
} from '../MovieSection/moviesSlice';

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

const Search = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const query = useSelector(selectQuery);
  const onChangeHandler = useRef(
    debounce((e) => {
      const { value } = e.target;

      dispatch(getMoviesAsync(value));
      if (!value) {
        setQuery(value);
      }
    }, 1000)
  );


  useEffect(() => {
    setTimeout(() => {
      dispatch(getMoviesAsync('deadpool'));
    }, 500);
  }, []);

  useEffect(() => {
    console.log(page, query);
  }, [query]);

  return (
    <div className="search">
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Text input"
          onChange={onChangeHandler.current}
        ></input>
      </div>
    </div>
  );
};

export default Search;
