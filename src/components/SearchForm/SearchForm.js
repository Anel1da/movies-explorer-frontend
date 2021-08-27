import React from "react";
import find from "../../images/find.svg";
import searchIcon from "../../images/search-icon.svg";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

export default function Searchform() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <div className="search-form__container">
          <img className="search__form-icon" src={searchIcon} alt="Поиск" />
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            required
          />
          <button type="submit" className="search-form__submit-btn">
            <img src={find} alt="find" className="search-form__btn-icon" />
          </button>
        </div>
      </form>
      <FilterCheckbox />
    </section>
  );
}
