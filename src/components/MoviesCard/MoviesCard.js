import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import film from "../../images/film.svg";

export default function MoviesCard({
  movie,
  movieTitle,
  movieDuration,
  movieTrailer,
  movieImage,
  /*   savedMovies,
  addMovieToFavorites,
  removeMovieFromFavorites */
}) {
  const { pathname } = useLocation();

  return (
    <>
      <div className="movie" key={movie.id}>
        <div className="movie__container">
          <a
            href={movieTrailer}
            rel="noopener noreferrer"
            target="_blank"
            className="movie__trailer"
          >
            <img className="movie__image" src={movieImage} alt={movieTitle} />
          </a>
          <div className="movie__info">
            <h3 className="movie__title">{movieTitle}</h3>
            <p className="movie__duration">{movieDuration}</p>
          </div>
          <button type="button" className="movie__saveBtn"></button>
        </div>
      </div>
    </>
  );
}
