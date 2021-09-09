import React from "react";
import "./SavedMovies.css";
import calculateMovieDuration from "../../utils/calculateMoviesDuration";
import MoviesCard from "../MoviesCard/MoviesCard";

export default function MoviesCardList({
  moviesError,
  handleSaveBtnClick,
  savedMovies,
}) {
  return (
    <>
      {moviesError !== "" ? (
        <p className={`savedmovies-list__noresult`}>{moviesError}</p>
      ) : (
        <section className={`savedmovies-list`}>
          {savedMovies.map((savedMovie) => (
            <MoviesCard
              movie={savedMovie}
              key={savedMovie.movieId}
              movieTitle={savedMovie.nameRU}
              movieDuration={calculateMovieDuration(savedMovie.duration)}
              movieTrailer={savedMovie.trailer}
              movieImage={savedMovie.image}
              handleSaveBtnClick={handleSaveBtnClick}
              savedMovies={savedMovies}
            />
          ))}
        </section>
      )}
    </>
  );
}

/* const [noSavedMovies, setNoSavedMovies] = useState(true);
useEffect(() => {
  if ((savedMovies.lenght = 0)) {
    setNoSavedMovies(true);
  }
}, [savedMovies]);
return (
  <>
    {noSavedMovies === true  */
