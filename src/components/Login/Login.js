import { Link } from "react-router-dom";
import React from "react";
import "./Login.css";
import Preloader from "../Preloader/Preloader";
import logo from "../../images/logo.svg";

export default function Login() {
  return (
    <section className="login">
      <Link to="/">
        <img src={logo} className="login__logo" alt="Логотип" />
      </Link>
      <h1 className="login__title">Рады Вас видеть!</h1>
      <form className="login__form" name="login-form">
        <label className="login__label">
          <p className="login__input-title">E-mail</p>
          <input
            id="email"
            name="email"
            type="email"
            className="login__input"
            required
            placeholder="Email"
            noValidate
          ></input>
          <span className="login__error-message"></span>
        </label>
        <label className="login__label">
          <p className="login__input-title">Пароль</p>
          <input
            id="password"
            name="password"
            type="password"
            className="login__input"
            required
            placeholder="Пароль"
            noValidate
          ></input>
          <span className="login__error-message"></span>
        </label>
        <button className="login__signin" type="submit">
          Войти
        </button>
        <span className="login__signup">
          Ещё не зарегистрированы?
          <Link className="login__signup-link" to="/signup">
            Регистрация
          </Link>
        </span>
      </form>
    </section>
  );
}
