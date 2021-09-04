import { React } from "react";
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
import {
  NOT_FOUND_ERR,
  FAILED_TO_FETCH_ERR,
  SEARCH_VALUE_MISSING,
} from "../../utils/utils";

export default function Movies({ loggedIn, isOpen, onClose, onClick }) {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreBtnVisibility, setLoadMoreBtnVisibility] = useState(false);
  const [moviesError, setMoviesError] = useState("");
  const [foundMovies, setFoundMovies] = useState([]); //все найденные по запросу фильмы
  const [localSearchedMovies, setLocalSearchedMovie] = useState(
    JSON.parse(localStorage.getItem("movies")) //фильмы сохраненные в локальном хранилище при первом поиске
  );
  const [numberOfCards, setNumberOfCards] = useState({
    startCards: 0,
    rowCards: 0, //число карточек для отрисовки
    moreCards: 0,
  });

  // ограничение числа карточек на странице
  useEffect(() => {
    limitNumberOfCards();
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
          />
        )}
        <Navigation isOpen={isOpen} onClose={onClose} />
      </div>
      <Footer />
    </>
  );
}
