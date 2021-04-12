import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMoviesAsync,
  setQuery,
  selectQuery,
  selectPage,
} from '../MovieSection/moviesSlice';
import debounce from '../../lib/debounce';
import './Search.scss';

const Search = () => {
  const dispatch = useDispatch();
  const { page, query } = useSelector(({ movies: { page, query } }) => ({
    page,
    query,
  }));
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
          <i className="fas fa-search"></i>
        </div>
      </div>
      {query && (
        <div className="top-msg">Searching for movies containing "{query}"</div>
      )}
    </div>
  );
};

export default Search;
