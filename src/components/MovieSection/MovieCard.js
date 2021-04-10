import React, { useState } from 'react';

const getFullImgPath = (slug) =>
  slug
    ? `https://image.tmdb.org/t/p/w500${slug}`
    : `https://via.placeholder.com/300x400/000000/FFFFFF/?text=No+Poster+Image+Found`;

const MovieCard = ({ title, description, imgPath, numRatings, rating }) => {
  // const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  // const descriptionClassName = "description" + ((isDescriptionExpanded) ? ' expanded' : '');
  return (
    <div className="card movie-card">
      <div className="movie-img">
        <img src={getFullImgPath(imgPath)} alt={`Poster for ${title}`}></img>
      </div>
      <div className="movie-details">
        <h3 className="title">{title}</h3>
        <p className="description">
        { description }
          {/* {(!isDescriptionExpanded && description.length > 150) ? (
            <>{description.substring(0, 150)}... <span onClick={() => setIsDescriptionExpanded(true)}>Read More</span></>) : <>{ description }</>} */}
        </p>

        <div>{numRatings}</div>
        <div>{rating}</div>
      </div>
    </div>
  );
};

export default MovieCard;
