import { Link } from "react-router-dom";
import React from "react";
import "./Login.css";
import logo from "../../images/logo.svg";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import { MAIN } from "./../../utils/utils";

export default function Login({ onLogin }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const { email, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin({ email, password });
  };

  return (
    <section className="login">
      <Link to={MAIN}>
        <img src={logo} className="login__logo" alt="Логотип" />
      </Link>
      <h1 className="login__title">Рады Вас видеть!</h1>
      <form className="login__form" name="login-form" onSubmit={handleSubmit}>
        <label className="login__label">
          <p className="login__input-title">E-mail</p>
          <input
            id="email"
            name="email"
            type="email"
            className={`
            login__input
             ${errors.email && "login__input_falsy"}
          `}
            required
            placeholder="Email"
            noValidate
            minLength="2"
            maxLength="30"
            onChange={handleChange}
            value={values.email || ""}
            autoComplete="off"
          ></input>
          <span className="login__error-message"> {errors.email || ""}</span>
        </label>
        <label className="login__label">
          <p className="login__input-title">Пароль</p>
          <input
            id="password"
            name="password"
            type="password"
            minLength="8"
            maxLength="30"
            className={`
            login__input
             ${errors.password && "login__input_falsy"}
          `}
            required
            placeholder="Пароль"
            onChange={handleChange}
            autoComplete="off"
            value={values.password || ""}
          ></input>
          <span className="login__error-message"> {errors.password || ""}</span>
        </label>
        <button
          className={`
         login__signin-btn
         ${!isValid && " login__signin-btn_disabled"}
       `}
          type="submit"
          disabled={!isValid && true}
        >
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
