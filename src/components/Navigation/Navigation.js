import { React } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import profile from "../../images/profile.svg";
import { MAIN, MOVIES, SAVEDMOVIES, PROFILE } from "./../../utils/utils";

export default function Navigation({ isOpen, onClose }) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          aria-label="Закрыть окно"
          onClick={onClose}
        ></button>
        <nav className="popup__links">
          <NavLink
            exact
            to={MAIN}
            className="popup__link"
            activeClassName="popup__link_active"
            onClick={onClose}
          >
            Главная
          </NavLink>
          <NavLink
            to={MOVIES}
            className="popup__link"
            activeClassName="popup__link_active"
            onClick={onClose}
          >
            Фильмы
          </NavLink>
          <NavLink
            to={SAVEDMOVIES}
            className="popup__link"
            activeClassName="popup__link_active"
            onClick={onClose}
          >
            Сохраненные фильмы
          </NavLink>
        </nav>
        <Link to={PROFILE} className="popup__profile" onClick={onClose}>
          <p>Аккаунт</p>
          <img src={profile} alt="Аккаунт" className="popup__profile-btn" />
        </Link>
      </div>
    </section>
  );
}
