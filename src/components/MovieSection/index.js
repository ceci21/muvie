// TODO: since movie card doesn't live elsewhere, it is inside the section. if it was used elsewhere, i would have a /common folder where it would live
import React, { useEffect } from 'react';
import './MovieSection.scss';
import { useSelector, useDispatch } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMovies, getMoviesAsync, selectMovies } from './moviesSlice';
import MovieCard from './MovieCard';

const MovieSection = () => {
  const movies = useSelector(selectMovies);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  const renderMovieColumns = () => {
    const col_1 = [];
    const col_2 = [];
    movies.forEach(
      (
        { original_title, poster_path, overview, vote_average, vote_count },
        i
      ) => {
        const movieCard = (
          <MovieCard
            key={original_title}
            title={original_title}
            description={overview}
            imgPath={poster_path}
            numRatings={vote_count}
            rating={vote_average}
          />
        );
        col_1.push(movieCard);
        // if (i % 2 === 0) {
        //   col_1.push(movieCard);
        // } else {
        //   col_2.push(movieCard);
        // }
      }
    );
    return (
      <div className="movie-cols">
        { col_1 }
        {/* <div className="column">{col_1}</div>
        <div className="column">{col_2}</div> */}
      </div>
    );
  };

  return (
    <div className="movie-section section">
      {movies && movies.page && <div>Page number: {movies.page}</div>}

      {/* <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="Placeholder image"
            ></img>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">John Smith</p>
              <p className="subtitle is-6">@johnsmith</p>
            </div>
          </div>

          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            nec iaculis mauris. <a>@bulmaio</a>.<a href="#">#css</a>{' '}
            <a href="#">#responsive</a>
            <br />
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div> */}
      {/* <div
        id="scrollableDiv"
        style={{
          height: 300,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}
      >
        <InfiniteScroll
          dataLength={movies.results.length}
          next={() => console.log('grab more data-- probably pass in page # here?')}
          style={{ display: 'flex', flexDirection: 'column-reverse' }}
          inverse={true} //
          hasMore={true}
          loader={<h4>Loading...</h4>}
          scrollableTarget="scrollableDiv"
        >
          {movies.results.map((_, index) => (
            <div key={index}>
              div - #{index}
            </div>
          ))}
        </InfiniteScroll>
      </div> */}
      { renderMovieColumns() }
    </div>
  );
};

export default MovieSection;
