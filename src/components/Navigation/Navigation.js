import { React } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import profile from "../../images/profile.svg";

export default function Navigation() {
  return (
    <section className="popup popup_opened ">
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          aria-label="Закрыть окно"
        ></button>
        <nav className="popup__links">
          <NavLink
            exact
            to="/"
            className="popup__link"
            activeClassName="popup__link_active"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="popup__link"
            activeClassName="popup__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="popup__link"
            activeClassName="popup__link_active"
          >
            Сохраненные фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="popup__profile">
          <p>Аккаунт</p>
          <img src={profile} alt="Аккаунт" className="popup__profile-btn" />
        </Link>
      </div>
    </section>
  );
}
