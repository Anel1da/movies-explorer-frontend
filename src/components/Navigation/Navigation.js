import { React } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import profile from "../../images/profile.svg";

export default function Navigation() {
  return (
    <section className="navigation navigation_opened">
      <div className="navigation__container">
        <button
          type="button"
          className="navigation__close-btn"
          aria-label="Закрыть окно"
        ></button>
        <nav className="navigation__links">
          <NavLink
            exact
            to="/"
            className="navigation__link navigation__link_active"
            activeClassName="navigation__link_active"
          >
            Главная
          </NavLink>
          <NavLink
            to="/movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Сохраненные фильмы
          </NavLink>
        </nav>
        <Link to="/profile" className="navigation__profile">
          <p>Аккаунт</p>
          <img src={profile} alt="Аккаунт" className="profile__profile-btn" />
        </Link>
      </div>
    </section>
  );
}
