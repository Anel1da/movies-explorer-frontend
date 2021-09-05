import React, { useRef } from "react";
import find from "../../images/find.svg";
import searchIcon from "../../images/search-icon.svg";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function Searchform({
  onSubmit,
  isShortMovies,
  setIsShortMovies,
}) {
  const inputElement = useRef(null);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(inputElement.current.value);
  };

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleFormSubmit}>
        <div className="search-form__container">
          <img className="search__form-icon" src={searchIcon} alt="Поиск" />
          <input
            type="search"
            className="search-form__input"
            placeholder="Фильм"
            required
            ref={inputElement}
          />
          <button type="submit" className="search-form__submit-btn">
            <img src={find} alt="find" className="search-form__btn-icon" />
          </button>
        </div>
      </form>
      <FilterCheckbox
        isShortMovies={isShortMovies}
        setIsShortMovies={setIsShortMovies}
      />
    </section>
  );
}
