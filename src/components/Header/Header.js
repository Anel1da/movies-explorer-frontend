import "./Header.css";
import logo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link, Route, Switch } from "react-router-dom";

export default function Header() {
  return (
    <Switch>
      <Route exact path="/">
        <div className="header">
          <Link to="/">
            <img src={logo} className="header__logo" alt="Логотип" />
          </Link>
          <ul className="header__navigation">
            <li>
              <Link to="/signup" className="header__link">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to="/signin" className="header__link header__login-btn">
                Войти
              </Link>
            </li>
          </ul>
        </div>
      </Route>

      <Route exact path="/movies">
        <div className="header">
          <Link to="/">
            <img src={logo} className="header__logo" alt="Логотип" />
          </Link>
          <div className="header__films">
            <Link to="/movies" className="header__link header__link_profile">
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className="header__link header__link_profile"
            >
              Сохраненные фильмы
            </Link>
          </div>
          <Link to="/profile" className="header__link header__profile">
            <p>Аккаунт</p>
            <img src={profile} alt="Аккаунт" className="header__profile-btn" />
          </Link>
          <button type="button" className="header__btn-menu"></button>
        </div>
      </Route>

      <Route exact path="/saved-movies">
        <div className="header">
          <Link to="/">
            <img src={logo} className="header__logo" alt="Логотип" />
          </Link>
          <div className="header__films">
            <Link to="/movies" className="header__link header__link_profile">
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className="header__link header__link_profile"
            >
              Сохраненные фильмы
            </Link>
          </div>
          <Link to="/profile" className="header__link header__profile">
            <p>Аккаунт</p>
            <img src={profile} alt="Аккаунт" className="header__profile-btn" />
          </Link>
          <button type="button" className="header__btn-menu"></button>
        </div>
      </Route>

      <Route exact path="/profile">
        <div className="header">
          <Link to="/">
            <img src={logo} className="header__logo" alt="Логотип" />
          </Link>
          <div className="header__films">
            <Link to="/movies" className="header__link header__link_profile">
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className="header__link header__link_profile"
            >
              Сохраненные фильмы
            </Link>
          </div>
          <Link to="/profile" className="header__link header__profile">
            <p>Аккаунт</p>
            <img src={profile} alt="Аккаунт" className="header__profile-btn" />
          </Link>
          <button type="button" className="header__btn-menu"></button>
        </div>
      </Route>
    </Switch>
  );
}
