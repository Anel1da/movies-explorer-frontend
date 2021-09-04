import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MoviesCardList.css";
import calculateMovieDuration from "../../utils/calculateMoviesDuration";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreButton from "../MoreButton/MoreButton";

export default function MoviesCardList({
  movies,
  initalNumberOfCards,
  moviesError,
  loadMoreBtnHandler,
  loadMoreBtnVisibility,
}) {
  return (
    <>
      {moviesError !== "" ? (
        <p className={`movies-list__noresult`}>{moviesError}</p>
      ) : (
        <section className={`movies-list`}>
          {movies.slice(0, initalNumberOfCards).map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id}
              movieTitle={movie.nameRU}
              movieDuration={calculateMovieDuration(movie.duration)}
              movieTrailer={movie.trailerLink}
              movieImage={
                movie.image
                  ? `https://api.nomoreparties.co${movie.image.url}`
                  : "https://imgur.com/j6h8g1O"
              }
            />
          ))}
        </section>
      )}
      <MoreButton
        isVisible={loadMoreBtnVisibility}
        onClick={loadMoreBtnHandler}
      />
    </>
  );
}
