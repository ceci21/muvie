import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMovies,
  getMoviesAsync,
  setQuery,
  selectQuery,
  selectPage,
} from '../MovieSection/moviesSlice';
import './Search.scss';

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const Search = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const query = useSelector(selectQuery);
  const onChangeHandler = useRef(
    debounce((e) => {
      const { value } = e.target;

      dispatch(getMoviesAsync({ query: value, page: 1 }));
      if (!value) {
        setQuery(value);
      }
    }, 1000)
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch(getMoviesAsync({ query: 'deadpool', page: 1 }));
    }, 500);
  }, []);

  useEffect(() => {
    console.log(page, query);
  }, [query]);

  return (
    <div className="search">
      <div className="control">
        <div className="input-container">
          <input
            className="input"
            type="text"
            placeholder="Search for your favorite movies"
            onChange={onChangeHandler.current}
          ></input>
          <i class="fas fa-search"></i>
        </div>
      </div>
      {query && (
        <div className="top-msg">Searching for movies containing "{query}"</div>
      )}
    </div>
  );
};

export default Search;
