import { Link } from "react-router-dom";
import React from "react";
import "./Register.css";
import Preloader from "../Preloader/Preloader";
import logo from "../../images/logo.svg";

export default function Register() {
  return (
    <section className="register">
      <Link to="/">
        <img src={logo} className="register__logo" alt="Логотип" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form " name="register-form">
        <label className="register__label">
          <p className="register__input-title"> Имя</p>
          <input
            id="name"
            name="name"
            type="name"
            className="register__input"
            placeholder="Имя"
            required
          />
          <span className="register__error-message"></span>
        </label>
        <label className="register__label">
          <p className="register__input-title">E-mail</p>
          <input
            id="email"
            name="email"
            type="email"
            className="register__input"
            required
            placeholder="Email"
            noValidate
          ></input>
          <span className="register__error-message"></span>
        </label>
        <label className="register__label">
          <p className="register__input-title">Пароль</p>
          <input
            id="password"
            name="password"
            type="password"
            className="register__input register__input_error"
            placeholder="Пароль"
            required
            noValidate
          ></input>
          <span className="register__error-message"></span>
        </label>
        <button className="register__signup" type="submit">
          Зарегистрироваться
        </button>
        <span className="register__login">
          Уже зарегистрированы?
          <Link className="register__login-link" to="/signin">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
}
