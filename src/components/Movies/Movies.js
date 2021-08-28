import { React } from "react";
import { api } from "../../utils/MoviesApi";
import "./Movies.css";
import Searchform from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function Movies() {
  

  return (
    <div className="movies">
      <Searchform />
      <MoviesCardList />
    </div>
  );
}
