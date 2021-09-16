import "./Header.css";
import logo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import {
  LOGIN,
  REGISTER,
  MAIN,
  MOVIES,
  SAVEDMOVIES,
  PROFILE,
} from "./../../utils/utils";

export default function Header({ onClick, loggedIn }) {
  return (
    <Switch>
      <Route exact path={MAIN}>
        <div className="header">
          <Link to={MAIN}>
            <img src={logo} className="header__logo" alt="Логотип" />
          </Link>

          {/* шапка сайта для  неавторизованного пользователя   */}
          {!loggedIn ? (
            <ul className="header__navigation">
              <li>
                <Link to={REGISTER} className="header__link">
                  Регистрация
                </Link>
              </li>
              <li>
                <Link to={LOGIN} className="header__link header__login-btn">
                  Войти
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}

          {/* шапка сайта для авторизованного пользователя   */}
          {loggedIn ? (
            <>
              <div className="header__films">
                <NavLink
                  to={MOVIES}
                  className="header__link header__link_profile"
                  activeClassName="header__link_active"
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to={SAVEDMOVIES}
                  className="header__link header__link_profile"
                  activeClassName="header__link_active"
                >
                  Сохраненные фильмы
                </NavLink>
              </div>
              <Link to={PROFILE} className="header__link header__profile">
                <p>Аккаунт</p>
                <img
                  src={profile}
                  alt="Аккаунт"
                  className="header__profile-btn"
                />
              </Link>
              <button
                type="button"
                className="header__btn-menu"
                onClick={onClick}
              ></button>
            </>
          ) : (
            ""
          )}
        </div>
      </Route>

      <Route exact path={MOVIES}>
        <div className="header">
          <Link to={MAIN}>
            <img src={logo} className="header__logo" alt="Логотип" />
          </Link>
          <div className="header__films">
            <NavLink
              to={MOVIES}
              className="header__link header__link_profile"
              activeClassName="header__link_active"
            >
              Фильмы
            </NavLink>
            <NavLink
              to={SAVEDMOVIES}
              className="header__link header__link_profile"
              activeClassName="header__link_active"
            >
              Сохраненные фильмы
            </NavLink>
          </div>
          <NavLink
            to={PROFILE}
            className="header__link header__profile"
            activeClassName="header__link_active"
          >
            <p>Аккаунт</p>
            <img src={profile} alt="Аккаунт" className="header__profile-btn" />
          </NavLink>
          <button
            type="button"
            className="header__btn-menu"
            onClick={onClick}
          ></button>
        </div>
      </Route>

      <Route exact path={SAVEDMOVIES}>
        <div className="header">
          <Link to={MAIN}>
            <img src={logo} className="header__logo" alt="Логотип" />
          </Link>
          <div className="header__films">
            <NavLink
              to={MOVIES}
              className="header__link header__link_profile"
              activeClassName="header__link_active"
            >
              Фильмы
            </NavLink>
            <NavLink
              to={SAVEDMOVIES}
              className="header__link header__link_profile"
              activeClassName="header__link_active"
            >
              Сохраненные фильмы
            </NavLink>
          </div>
          <NavLink
            to={PROFILE}
            className="header__link header__profile"
            activeClassName="header__link_active"
          >
            <p>Аккаунт</p>
            <img src={profile} alt="Аккаунт" className="header__profile-btn" />
          </NavLink>
          <button
            type="button"
            className="header__btn-menu"
            onClick={onClick}
          ></button>
        </div>
      </Route>

      <Route exact path={PROFILE}>
        <div className="header">
          <Link to={MAIN}>
            <img src={logo} className="header__logo" alt="Логотип" />
          </Link>
          <div className="header__films">
            <Link to={MOVIES} className="header__link header__link_profile">
              Фильмы
            </Link>
            <Link
              to={SAVEDMOVIES}
              className="header__link header__link_profile"
            >
              Сохраненные фильмы
            </Link>
          </div>
          <NavLink
            to={PROFILE}
            className="header__link header__profile"
            activeClassName="header__link_active"
          >
            <p>Аккаунт</p>
            <img src={profile} alt="Аккаунт" className="header__profile-btn" />
          </NavLink>
          <button
            type="button"
            className="header__btn-menu"
            onClick={onClick}
          ></button>
        </div>
      </Route>
    </Switch>
  );
}
