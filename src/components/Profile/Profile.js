import "./Profile.css";
import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function Profile({ handleLogOut, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid } =
    useFormWithValidation();
  const { name, email } = values;

  const handleSubmitUpdateProfile = (evt) => {
    evt.preventDefault();
    onUpdateProfile({ name, email });
  };

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [setValues, currentUser]);

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>

      <form className="profile__form" onSubmit={handleSubmitUpdateProfile}>
        <label className="profile__label">
          Имя
          <input
            id="name"
            name="name"
            type="name"
            className="profile__input"
            required
            minLength="2"
            maxLength="30"
            value={values.name || ""}
            onChange={handleChange}
            autoComplete="off"
          />
          <span className="profile__error-message"> {errors.name || ""}</span>
        </label>

        <label className="profile__label">
          E-mail
          <input
            id="email"
            name="email"
            type="email"
            className="profile__input"
            required
            minLength="2"
            maxLength="30"
            value={values.email || ""}
            onChange={handleChange}
            autoComplete="off"
          ></input>
          <span className="profile__error-message"> {errors.email || ""}</span>
        </label>

        <button
          type="submit"
          disabled={!isValid && true}
          className={`profile__edit-button ${
            !isValid && "profile__edit-button_disabled"
          }`}
        >
          Редактировать
        </button>
        <NavLink to="/" className="profile__logout" onClick={handleLogOut}>
          Выйти из аккаунта
        </NavLink>
      </form>
    </section>
  );
}
