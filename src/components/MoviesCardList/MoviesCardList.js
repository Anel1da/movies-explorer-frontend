import "./MoviesCardList.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoreButton from "../MoreButton/MoreButton";
import SavedMovies from '../SavedMovies/SavedMovies';

export default function MoviesCardList() {
  return (
    <>
      <section className="movies-list">
        <Switch>
          <Route exact path="/movies">
            <MoviesCard />
          </Route>
          <Route exact path="/saved-movies">
            <SavedMovies />
          </Route>
        </Switch>
      </section>
      <MoreButton />
    </>
  );
}
