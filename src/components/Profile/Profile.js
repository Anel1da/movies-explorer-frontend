import "./Profile.css";
import React from "react";
import Preloader from "../Preloader/Preloader";

export default function Profile() {
  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, Виталий!`}</h2>

      <form className="profile__form">
        <label className="profile__label">
          Имя
          <input
            id="name"
            name="name"
            type="name"
            className="profile__input"
            placeholder="Виталий"
            required
          />
          <span className="profile__error-message"></span>
        </label>

        <label className="profile__label">
          E-mail
          <input
            id="email"
            name="email"
            type="email"
            className="profile__input"
            required
            placeholder="pochta@yandex.ru"
            noValidate
          ></input>
          <span className="profile__error-message"></span>
        </label>

        <button className="profile__edit-button" type="submit">
          Редактировать
        </button>
        <button className="profile__logout-button" type="submit">
          Выйти из аккаунта
        </button>
      </form>
    </section>
  );
}