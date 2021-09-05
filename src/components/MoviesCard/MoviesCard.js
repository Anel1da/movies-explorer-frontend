import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";

export default function MoviesCard({
  movie,
  movieTitle,
  movieDuration,
  movieTrailer,
  movieImage,
  handleSaveBtnClick,
  savedMovies,
}) {
  const { pathname } = useLocation();
  const [isSaved, setIsSaved] = useState("");

   useEffect(() => {
    if (savedMovies.some((item) => item.movieId === movie.id)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, savedMovies); 

  function handleClick(movie) {
    handleSaveBtnClick(movie);
  }

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
          {pathname === "/movies" ? (
            <button
              type="button"
              className={`movie__saveBtn  ${isSaved && "movie__saveBtn_saved"}`}
              onClick={() => handleClick(movie)}
            ></button>
          ) : (
            <button
              type="button"
              className={`movie__saveBtn  movie__saveBtn_remove`}
              onClick={() => handleClick(movie)}
            ></button>
          )}
        </div>
      </div>
    </>
  );
}
