import React from 'react';
import './MovieSection.scss';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMoviesAsync } from '../../app/moviesSlice';
import MovieCard from '../MovieCard';

const MovieSection = () => {
  const dispatch = useDispatch();
  const { results, query, page, totalPages, status } = useSelector(
    ({ movies: { results, query, page, totalPages, status } }) => ({
      results,
      query,
      page,
      totalPages,
      status
    })
  );

  const resultsStr =
    results && results.length && results.length === 1 ? 'result' : 'results';

  if (query && results && !results.length && status !== 'loading') {
    // No results page
    return (
      <div id="movie-section" className="movie-section empty">
        <img src="/popcorn.svg"></img>
        <div>Hmm, I can't seem to find anything with that search term.</div>
      </div>
    );
  }

  if (results && !results.length) {
    return (
      <div id="movie-section" className="movie-section empty">
        <img src="/popcorn.svg"></img>
        <div>Search for your favorite movie above, like "Deadpool" or "Interstellar"!</div>
      </div>
    );
  }

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
        loader={
          <div className="bottom-scroll-msg">Loading some good flicks...</div>
        }
        endMessage={
          <div className="bottom-scroll-msg">You reached the end!</div>
        }
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
