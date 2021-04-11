// TODO: since movie card doesn't live elsewhere, it is inside the section. if it was used elsewhere, i would have a /common folder where it would live
import React, { useEffect } from 'react';
import './MovieSection.scss';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getMovies,
  getMoviesAsync,
  selectMovies,
  selectStatus,
  selectPage,
  selectQuery,
  selectTotalPages,
} from './moviesSlice';
import MovieCard from './MovieCard';

const MovieSection = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const status = useSelector(selectStatus);
  const query = useSelector(selectQuery);
  const page = useSelector(selectPage);
  const totalPages = useSelector(selectTotalPages);

  useEffect(() => {
    console.log(movies, status, movies.length, page, totalPages);
  }, [movies, status, totalPages]);

  return (
    <div id="movie-section" className="movie-section section">
      {movies && movies.length > 0 && <p>{movies.length} results</p>}
      <InfiniteScroll
        // className="movie-cols"
        dataLength={movies.length}
        next={() => dispatch(getMoviesAsync({ query, page: page + 1 }))}
        hasMore={page < totalPages}
        loader={<div>Loading some good flix...</div>}
        scrollThreshold={'10px'}
        endMessage={<div className="scroll-msg">That's all!</div>}
      >
        <div className="movie-cols">
        {movies.map((entry, i) => (
          <MovieCard key={i} entry={entry} />
        ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieSection;
