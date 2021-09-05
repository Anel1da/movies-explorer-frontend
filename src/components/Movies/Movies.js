import { React, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Searchform from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";

import {
  NOT_FOUND_ERR,
  FAILED_TO_FETCH_ERR,
  SEARCH_VALUE_MISSING,
} from "../../utils/utils";

export default function Movies({ loggedIn, isOpen, onClose, onClick }) {
  const currentUser = useContext(CurrentUserContext);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreBtnVisibility, setLoadMoreBtnVisibility] = useState(false);
  const [moviesError, setMoviesError] = useState("");
  const [foundMovies, setFoundMovies] = useState([]); //все найденные по запросу фильмы
  const [localSearchedMovies, setLocalSearchedMovie] = useState(
    JSON.parse(localStorage.getItem("movies")) //фильмы сохраненные в локальном хранилище при первом поиске
  );
  const [savedMovies, setSavedMovies] = useState([]); // фильмы, добавленные в сохраненные

  const [numberOfCards, setNumberOfCards] = useState({
    //количество карточек для отрисовки
    startCards: 0,
    rowCards: 0,
    moreCards: 0,
  });

  // ограничение числа карточек на странице
  useEffect(() => {
    limitNumberOfCards();
    loadSavedMovies();
  }, []);

  useEffect(() => {
    loadMoreBtnVisible();
  }, [foundMovies, numberOfCards]);

  function limitNumberOfCards() {
    const viewportWidth = window.screen.width;
    if (viewportWidth < 767) {
      setNumberOfCards({ startCards: 5, rowCards: 1, moreCards: 2 });
    } else if (viewportWidth < 1200) {
      setNumberOfCards({ startCards: 8, rowCards: 2, moreCards: 2 });
    } else {
      setNumberOfCards({ startCards: 12, rowCards: 3, moreCards: 3 });
    }
  }

  // кнопка Еще

  const loadMoreBtnHandler = () => {
    return setNumberOfCards({
      ...numberOfCards,
      startCards: numberOfCards.startCards + numberOfCards.moreCards,
    });
  };

  function loadMoreBtnVisible() {
    if (foundMovies.length > numberOfCards.startCards) {
      setLoadMoreBtnVisibility(true);
    } else {
      setLoadMoreBtnVisibility(false);
    }
  }

  // поиск по ключевому слову с проверкой длины массива
  const filterMoviesByKeyword = (movies, query) => {
    const filteredMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase())
    );
    setFoundMovies(() => {
      localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
      return filteredMovies;
    });
    checkArray(filteredMovies);
  };

  //проверка длины массива
  function checkArray(foundMovies) {
    if (foundMovies.length === 0) {
      setMoviesError(NOT_FOUND_ERR);
    } else {
      setMoviesError("");
    }
  }

  //поиск фильмов
  const searchMovieHandler = (query) => {
    if (pathname === "/movies") {
      if (!localStorage.getItem("movies")) {
        setIsLoading(true);
        moviesApi
          .getMovies()
          .then((movies) => {
            localStorage.setItem("movies", JSON.stringify(movies));
            filterMoviesByKeyword(JSON.parse(localStorage.movies), query);

            setIsLoading(false);
          })
          .catch((err) => {
            console.log("Ошибка: ", err);
            setMoviesError(FAILED_TO_FETCH_ERR);
          })
          .finally(() => setIsLoading(false));
        return;
      } else {
        filterMoviesByKeyword(
          localStorage.getItem("movies") ? JSON.parse(localStorage.movies) : [],
          query
        );
      }
    } /*else {
       поиск по сохраненным фильмам 
    }*/
  };

  //
  //загрузить сохраненные пользователем фильмы
  const loadSavedMovies = () => {
    return mainApi
      .getMovies()
      .then((res) => {
        const movies = res.filter((movie) => movie.owner === currentUser._id);
        setSavedMovies(movies);
        localStorage.setItem("savedMovies", JSON.stringify(movies));
      })
      .catch((err) => {
        console.log("Ошибка: ", err);
      });
  };

  //сохранение и удаление фильмов

  const saveMovie = (data) => {
    mainApi
      .saveMovie(data)
      .then((newMovie) => {
        setSavedMovies([newMovie.data, ...savedMovies]);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([newMovie.data, ...savedMovies])
        );
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  const deleteMovie = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(
          (item) => item._id !== movie._id
        );
        setSavedMovies(updatedSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(updatedSavedMovies));
      })
      .catch((err) => console.log("Ошибка: ", err));
  };

  function handleSaveBtnClick(movie) {
    if (!savedMovies.some((item) => item.movieId === movie.id)) {
      saveMovie({
        country: movie.country ? movie.country : "Страна не указана",
        director: movie.director ? movie.director : "Режиссёр не указан",
        duration: movie.duration,
        year: movie.year ? movie.year : "Год не указан",
        description: movie.description
          ? movie.description
          : "Описание фильма отсутствует",
        image: `https://api.nomoreparties.co${movie.image.url}`,
        trailer: movie.trailerLink ? movie.trailerLink : "https://youtube.ru",
        thumbnail: movie.image.formats.thumbnail.url
          ? `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`
          : "Параметр не указан",
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN
          ? movie.nameEN
          : "Англоязычное название не указано",
      });
    } else {
      const movieForDelete = savedMovies.find(
        (item) => item.movieId === movie.id
      );
      deleteMovie(movieForDelete);
    }
  }
  //отслеживание изменение ширины экрана
  window.addEventListener("resize", function () {
    setTimeout(() => {
      limitNumberOfCards();
    }, 250);
  });

  return (
    <>
      <Header onClick={onClick} />
      <div className="movies">
        <Searchform onSubmit={searchMovieHandler} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={foundMovies}
            initalNumberOfCards={numberOfCards.startCards}
            {...{ moviesError }}
            loadMoreBtnHandler={loadMoreBtnHandler}
            loadMoreBtnVisibility={loadMoreBtnVisibility}
            handleSaveBtnClick={handleSaveBtnClick}
          />
        )}
        <Navigation isOpen={isOpen} onClose={onClose} />
      </div>
      <Footer />
    </>
  );
}
