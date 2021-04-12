import React, { useEffect, useState } from 'react';
import StarRating from '../StarRating';
import getOffset from '../../lib/getOffset';
import { breakpoints } from '../../lib/constants';
import './MovieCard.scss';

const getImgPosterPath = (slug) =>
  slug
    ? `https://image.tmdb.org/t/p/w400${slug}`
    : `https://via.placeholder.com/300x400/000000/FFFFFF/?text=No+Poster+Image+Found`;

const MovieCard = ({ entry }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [readMore, setReadMore] = useState(false);
  const [maxCharLen, setMaxCharLen] = useState(100);
  const {
    original_title = '',
    poster_path = '',
    overview = '',
    release_date,
    vote_average = 5,
    vote_count = 0,
  } = entry;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
  }, []);

  useEffect(() => {
    let result, minCharLen, maxCharLen, minWidth, maxWidth;

    const { MOBILE, TABLET, DESKTOP_MD, DESKTOP_LG, DESKTOP_XL } = breakpoints;

    if (width >= TABLET && width <= DESKTOP_MD) {
      minCharLen = 30;
      maxCharLen = 220;
      minWidth = TABLET;
      maxWidth = DESKTOP_MD;
    } else if (width > DESKTOP_MD && width < DESKTOP_LG) {
      minCharLen = 40;
      maxCharLen = 100;
      minWidth = DESKTOP_MD;
      maxWidth = DESKTOP_LG;
    } else if (width >= DESKTOP_XL) {
      result = 60;
    } else if (width <= MOBILE) {
      result = 30;
    } else {
      minCharLen = 10;
      maxCharLen = 50;
      minWidth = 0;
      maxWidth = 480;
    }

    if (!result) {
      result =
        minCharLen +
        getOffset(width, minCharLen, maxCharLen, minWidth, maxWidth);
    }
    setMaxCharLen(result);
  }, [width]);

  const year = release_date ? new Date(release_date).getFullYear() : '';
  const readLink = readMore ? 'Read Less' : 'Read More';

  let descripClassName = 'description';
  if (overview.length > maxCharLen && readMore) {
    descripClassName += ' expanded';
  }

  let description;
  if (overview) {
    description = (
      <>
        {!readMore && overview.length > maxCharLen
          ? overview.substring(0, maxCharLen) + '... '
          : overview}
      </>
    );
  } else {
    description = <em>No description available</em>;
  }

  return (
    <div className="movie-card">
      <div className="movie-img">
        <a
          href={`https://www.themoviedb.org/movie/${entry.id}`}
          alt={`${original_title} - The Movie Database`}
        >
          <img
            src={getImgPosterPath(poster_path)}
            alt={`Poster for ${original_title}`}
            loading="lazy"
            target="_blank"
          ></img>
        </a>
      </div>
      <div className="movie-details">
        <h3 className="title">
          <a
            href={`https://www.themoviedb.org/movie/${entry.id}`}
            target="_blank"
            alt={`${original_title} - The Movie Database`}
          >
            {original_title}
          </a>
        </h3>
        <div>{year}</div>
        <p className={descripClassName}>
          <span>{description}</span>
        </p>
        {overview.length > maxCharLen && (
          <a
            className="read-more-link"
            onClick={() => {
              setReadMore(!readMore);
            }}
            alt={'Expand'}
          >
            {' '}
            <span>{readLink}</span>
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
