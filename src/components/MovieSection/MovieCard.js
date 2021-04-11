import React, { useEffect, useState } from 'react';
import StarRating from '../StarRating';

const desktopScrn = 1024;

const getImgPath = (slug) =>
  slug
    ? `https://image.tmdb.org/t/p/w400${slug}`
    : `https://via.placeholder.com/300x400/000000/FFFFFF/?text=No+Poster+Image+Found`;

const getCharLen = (currentWidth, minCharLen, maxCharLen, minWidth, maxWidth) => {
  const ratio = (maxCharLen - minCharLen) / (maxWidth - minWidth);
  const result = Math.floor(ratio * (currentWidth - minWidth));
  return result || 0;
};

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

    if (width >= 480 && width <= 1024) {
      minCharLen = 30;
      maxCharLen = 220;
      minWidth = 480;
      maxWidth = 1024;
    }

    else if (width > 1024 && width < 1600) {
      minCharLen = 40;
      maxCharLen = 100;
      minWidth = 1024;
      maxWidth = 1600;
    }

    else if (width >= 1600) {
      minCharLen = 60;
      maxCharLen = 160;
      minWidth = 1600;
      maxWidth = 2000;
    } else {
      minCharLen = 10;
      maxCharLen = 50;
      minWidth = 0;
      maxWidth = 480;
    }
    const result = getCharLen(width, minCharLen, maxCharLen, minWidth, maxWidth);
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
          : // ? overview + '... '
            overview}
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
