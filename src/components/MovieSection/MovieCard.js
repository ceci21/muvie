import React, { useState } from 'react';
import StarRating from '../StarRating';

const getImgPath = (slug) =>
  slug
    ? `https://image.tmdb.org/t/p/w400${slug}`
    : `https://via.placeholder.com/300x400/000000/FFFFFF/?text=No+Poster+Image+Found`;

const MovieCard = ({ entry }) => {
  const [readMore, setReadMore] = useState(false);
  const {
    original_title = '',
    poster_path = '',
    overview = '',
    release_date,
    vote_average = 5,
    vote_count = 0,
  } = entry;
  const maxCharLen = 100;
  const year = release_date ? new Date(release_date).getFullYear() : '';
  const linkName = readMore ? 'Read Less' : 'Read More';
  let descripClassName = 'description';
  if (overview.length > maxCharLen && readMore) {
    descripClassName += ' expanded';
  }

  let description;
  if (overview) {
    description = (
      <>
        {!readMore && overview.length > maxCharLen
          // ? overview.substring(0, maxCharLen) + '... '
          ? overview + '... '
          : overview}
      </>
    );
  } else {
    description = <em>No description available</em>;
  }
  return (
    <div className="movie-card">
      <div className="movie-img">
        <img
          loading="lazy"
          src={getImgPath(poster_path)}
          alt={`Poster for ${original_title}`}
        ></img>
      </div>
      <div className="movie-details">
        <h3 className="title">{original_title}</h3>
        <div>{year}</div>
        <p className={descripClassName}>
          <div className="fade-overlay"></div>
          <span>{description}</span>
        </p>
        {overview.length > maxCharLen && (
          <a
            className="read-more-link"
            onClick={() => {
              setReadMore(!readMore);
            }}
          >
            {' '}
            <span>{linkName}</span>
          </a>
        )}
        <div className="ratings">
          <StarRating value={vote_average / 2} />
          {vote_count ? (
            <span className="ratings-count">{vote_count} ratings</span>
          ) : (
            <span className="ratings-count">No ratings</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
