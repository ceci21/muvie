import React from 'react';
import './MovieSection.scss';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  getMoviesAsync,
} from './moviesSlice';
import MovieCard from './MovieCard';

const MovieSection = () => {
  const dispatch = useDispatch();
  const { results, query, page, totalPages } = useSelector(
    ({ movies: { results, query, page, totalPages } }) => ({
      results,
      query,
      page,
      totalPages,
    })
  );

  const resultsStr =
    results && results.length && results.length === 1 ? 'result' : 'results';

  return (
    <div id="movie-section" className="movie-section">
      {results && results.length > 0 && (
        <p className="results-msg">
          {results.length} {resultsStr}
        </p>
      )}
      <InfiniteScroll
        dataLength={results.length}
        hasMore={page < totalPages}
        scrollThreshold={'10px'}
        next={() => dispatch(getMoviesAsync({ query, page: page + 1 }))}
        loader={<div className="scroll-msg">Loading some good flicks...</div>}
        endMessage={<div className="scroll-msg">You reached the end!</div>}
      >
        <div className="movie-cols">
          {results.map((entry, i) => (
            <MovieCard key={entry.original_title} entry={entry} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default MovieSection;
