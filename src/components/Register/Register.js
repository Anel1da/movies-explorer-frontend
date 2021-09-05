import { Link } from "react-router-dom";
import { React } from "react";
import "./Register.css";
import logo from "../../images/logo.svg";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function Register({ onRegister }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation();
  const { name, email, password } = values;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister({ name, email, password });
  };

  return (
    <section className="register">
      <Link to="/">
        <img src={logo} className="register__logo" alt="Логотип" />
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form
        className="register__form "
        name="register-form"
        onSubmit={handleSubmit}
      >
        <label className="register__label">
          <p className="register__input-title"> Имя</p>
          <input
            id="name"
            name="name"
            type="name"
            className={`
           register__input
            ${errors.name && "register__input_falsy"}
         `}
            placeholder="Имя"
            required
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            autoComplete="off"
            value={values.name || ""}
          />
          <span className="register__error-message"> {errors.name || ""}</span>
        </label>
        <label className="register__label">
          <p className="register__input-title">E-mail</p>
          <input
            id="email"
            name="email"
            type="email"
            className={`
            register__input
             ${errors.email && "register__input_falsy"}
          `}
            required
            placeholder="Email"
            onChange={handleChange}
            minLength="2"
            maxLength="30"
            value={values.email || ""}
            autoComplete="off"
          ></input>
          <span className="register__error-message"> {errors.email || ""}</span>
        </label>
        <label className="register__label">
          <p className="register__input-title">Пароль</p>
          <input
            id="password"
            name="password"
            type="password"
            className={`
            register__input
             ${errors.password && "register__input_falsy"}
          `}
            placeholder="Пароль"
            required
            value={values.password || ""}
            onChange={handleChange}
            minLength="8"
            maxLength="30"
            autoComplete="off"
          ></input>
          <span className="register__error-message">
            {" "}
            {errors.password || ""}
          </span>
        </label>
        <button
          className={`
        register__signup-btn
        ${!isValid && "register__signup-btn_disabled"}
      `}
          type="submit"
          disabled={!isValid && true}
        >
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
