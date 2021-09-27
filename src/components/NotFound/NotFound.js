import React from "react";
import { useHistory } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const history = useHistory();
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__error">404</h1>
        <p className="not-found__message">Страница не найдена</p>
        <button className="not-found__back-btn" onClick={() => history.go(-2)}>
          Назад
        </button>
      </div>
    </section>
  );
}
