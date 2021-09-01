import "./Profile.css";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({ handleLogOut, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [userData, setUserData] = React.useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const [isEdit, setIsEdit] = React.useState(false);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  function handleEditInput() {
    setIsEdit(true);
  }

  return (
    <section className="profile">
      <h2 className="profile__title">{`Привет, ${userData.name}!`}</h2>

      <form className="profile__form">
        <label className="profile__label">
          Имя
          <input
            id="name"
            name="name"
            type="name"
            className="profile__input"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEdit}
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
            value={userData.email}
            onChange={handleChange}
            disabled={!isEdit}
            required
          ></input>
          <span className="profile__error-message"></span>
        </label>

        <button
          className="profile__edit-button"
          type="button"
          onClick={handleEditInput}
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
