import "./MoviesCardList.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreButton from "../MoreButton/MoreButton";

export default function MoviesCardList({
  movies,
  renderedMoviesList,
  setRenderedMoviesList,
  moviesVisible,
  setMoviesVisible,
  moreButtonVisible,
  setMoreButtonVisible,
  loggedIn,
  countInitialCards,
  moviesCount,
  setMoviesCount,
}) {
  const { pathname } = useLocation();
  const foundMovies = localStorage.getItem("foundMovies");
  const [noResultList, setNoResultList] = useState("");

  const calculateMovieDuration = (valueInMinutes) => {
    const hours = Math.floor(valueInMinutes / 60);
    const minutes = valueInMinutes % 60;
    let calculatedDuration = `${hours}ч ${minutes}м`;
    if (hours === 0) calculatedDuration = `${minutes}м`;
    if (minutes === 0) calculatedDuration = `${hours}ч`;
    return calculatedDuration;
  };

  useEffect(() => {
    if (movies.length >= renderedMoviesList.length) {
      setMoreButtonVisible("");
    } else {
      setMoreButtonVisible("more__btn_hidden");
    }
  }, [movies, renderedMoviesList]);

  useEffect(() => {
    const initialCards = countInitialCards();

    if (pathname === "/saved-movies") {
      setMoreButtonVisible("more__btn_hidden");
      setNoResultList("movies-list__noresult_hidden");
    } else {
      setNoResultList("");
    }
    if (loggedIn && foundMovies && JSON.parse(foundMovies).length > 0)
      setMoviesVisible("movies-list_visible");
    if (loggedIn && foundMovies)
      setRenderedMoviesList(JSON.parse(foundMovies).slice(0, initialCards));
  }, [movies, setRenderedMoviesList, pathname]);

  return (
    <>
      <section className={`movies-list ${moviesVisible}`}>
        {pathname === "/movies" ? (
          renderedMoviesList.length > 0 ? (
            ""
          ) : (
            <p className={`movies-list__noresult ${noResultList}`}>
              Ничего не найдено
            </p>
          )
        ) : (
          ""
          /*     savedMovies.length > 0
                    ? ''
                    : <p className={`movies-card-list__empty-text ${emptyListNoticeVisibility}`}>
                      Ничего не найдено
                    </p> */
        )}

        {
          pathname === "/movies"
            ? renderedMoviesList
                .slice(0, moviesCount.startCards)
                .map((movie) => (
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
                    /*  savedMovies={savedMovies}
                    addMovieToFavorites={addMovieToFavorites}
                    removeMovieFromFavorites={removeMovieFromFavorites} */
                  />
                ))
            : "" /* savedMovies.map((movie) => (
                <MoviesCard
                  movie={movie}
                  key={movie._id}
                  movieTitle={movie.nameRU}
                  movieDuration={calculateMovieDuration(movie.duration)}
                  movieTrailer={movie.trailerLink}
                  movieImage={
                    movie.image ? movie.image : "https://imgur.com/j6h8g1O"
                  }
                  savedMovies={savedMovies}
                  addMovieToFavorites={addMovieToFavorites}
                  removeMovieFromFavorites={removeMovieFromFavorites}
                />
              )) */
        }
      </section>
      <MoreButton />
    </>
  );
}
