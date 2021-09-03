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

export default function Movies({ loggedIn, isOpen, onClose, onClick }) {
  const SHORT_MOVIE_DURATION = 40;
  const { pathname } = useLocation();
  const [renderedMoviesList, setRenderedMoviesList] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState({
    startCards: 0,
    rowCards: 0,
    moreCards: 0,
  });
  const [isShortMovies, setIsShortMovies] = useState(false);
  const [searchInputError, setSearchInputError] = useState("");
  const [moviesVisible, setMoviesVisible] = useState("");
  const [moreButtonVisible, setMoreButtonVisible] =
    useState("more__btn_hidden");

  const shortMovies = (movies) => {
    return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
  };
  const filterShortMovies = (movies) => {
    if (isShortMovies) {
      return shortMovies(movies);
    }
    return movies.filter((movie) => movie.duration >= SHORT_MOVIE_DURATION);
  };

  function handleShortMovies() {
    setIsShortMovies(!isShortMovies);
  }

  const processedMovies = useMemo(
    () => filterShortMovies(foundMovies),
    [isShortMovies, foundMovies]
  );
  const processedRenderedMovies = useMemo(
    () => filterShortMovies(renderedMoviesList),
    [isShortMovies, renderedMoviesList]
  );

  useEffect(() => {
    if (processedMovies.length <= processedRenderedMovies.length) {
      setMoreButtonVisible("more__btn_hidden");
    }
  }, [processedMovies, processedRenderedMovies]);

  // отображение кольичества карточек на странице
  function renderCardsCount() {
    const viewportWidth = window.screen.width;
    if (viewportWidth < 767) {
      setMoviesCount({ startCards: 5, rowCards: 1, moreCards: 2 });
    } else if (viewportWidth < 1200) {
      setMoviesCount({ startCards: 8, rowCards: 2, moreCards: 2 });
    } else {
      setMoviesCount({ startCards: 16, rowCards: 4, moreCards: 4 });
    }
  }

  // фильтрацтя по ключевому слову
  const filterMoviesByKeyword = (movies, query) => {
    const filteredMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(query.toLowerCase())
    );
    setFoundMovies(() => {
      localStorage.setItem("foundMovies", JSON.stringify(filteredMovies));
      return filteredMovies;
    });
  };

  //загрузка фильмов с сервера BeatFilm
  const searchMovieHandler = (query) => {
    if (query === "") return setSearchInputError("Введите ключевое слово");
    setMoviesVisible("");

    if (pathname === "/movies") {
      if (!localStorage.getItem("movies")) {
        moviesApi
          .getMovies()
          .then((movies) => {
            localStorage.setItem("movies", JSON.stringify(movies));
            filterMoviesByKeyword(JSON.parse(localStorage.movies), query);
            setMoviesVisible("movies-list_visible");
            setMoreButtonVisible("");
          })
          .catch((err) => console.log(err));
        return;
      }

      filterMoviesByKeyword(
        localStorage.getItem("movies") ? JSON.parse(localStorage.movies) : [],
        query
      );
      setMoviesVisible("movies-list_visible");
      setMoreButtonVisible("");
    } /* else {
      setSavedMovies(
        savedMovies.filter((movie) =>
          movie.nameRU.toLowerCase().includes(query.toLowerCase())
        )
      );
      setMoviesVisibility("movies-card-list_visible");
    } */
  };

  return (
    <>
      <Header onClick={onClick} />
      <div className="movies">
        <Searchform
          setSearchInputError={setSearchInputError}
          onSubmit={searchMovieHandler}
          setIsShortMovies={handleShortMovies}
        />
        <MoviesCardList
          movies={processedMovies}
          renderedMoviesList={processedRenderedMovies}
          setRenderedMoviesList={setRenderedMoviesList}
          moviesVisible={moviesVisible}
          setMoviesVisible={setMoviesVisible}
          moreButtonVisible={moreButtonVisible}
          setMoreButtonVisible={setMoreButtonVisible}
          loggedIn={loggedIn}
          setMoviesCount={setMoviesCount}
          moviesCount={moviesCount}
          countInitialCards={renderCardsCount}
        />
        <Navigation isOpen={isOpen} onClose={onClose} />
      </div>
      <Footer />
    </>
  );
}
