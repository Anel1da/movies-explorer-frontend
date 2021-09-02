import { React } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import Searchform from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

export default function Movies({ loggedIn, isOpen, onClose, onClick }) {
  return (
    <>
      <Header onClick={onClick} />
      <div className="movies">
        <Searchform />
        <MoviesCardList />
        <Navigation isOpen={isOpen} onClose={onClose} />
      </div>
      <Footer />
    </>
  );
}
