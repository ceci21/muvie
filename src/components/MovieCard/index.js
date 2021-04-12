import React, { useEffect, useState } from 'react';
import StarRating from '../StarRating';
import getCharLen from '../../lib/getCharLen';
import { breakpoints } from '../../lib/constants';
import './MovieCard.scss';

const desktopScrn = 1024;

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
    let minCharLen, maxCharLen, minWidth, maxWidth;
    const {
      MOBILE,
      TABLET,
      DESKTOP_SM,
      DESKTOP_MD,
      DESKTOP_LG,
      DESKTOP_XL,
    } = breakpoints;

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
      minCharLen = 60;
      maxCharLen = 160;
      minWidth = DESKTOP_XL;
      maxWidth = 2000; // Since this calculation is based on a ratio, I set the max to 2000 despite screens being much larger than that
    } else {
      minCharLen = 10;
      maxCharLen = 50;
      minWidth = 0;
      maxWidth = 480;
    }
    const result = getCharLen(
      width,
      minCharLen,
      maxCharLen,
      minWidth,
      maxWidth
    );
    setMaxCharLen(minCharLen + result);
  }, [width]);

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
        <img
          src={getImgPosterPath(poster_path)}
          alt={`Poster for ${original_title}`}
          loading="lazy"
        ></img>
      </div>
      <div className="movie-details">
        <h3 className="title"><a href={`https://www.themoviedb.org/movie/${entry.id}`}>{original_title}</a></h3>
        <div>{year}</div>
        <p className={descripClassName}>
          {/* <div className="fade-overlay"></div> */}
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
