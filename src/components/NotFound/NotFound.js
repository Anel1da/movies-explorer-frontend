import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__error">404</h1>
        <p className="not-found__message">Страница не найдена</p>
        <Link className="not-found__back-link" to="#">
          Назад
        </Link>
      </div>
    </section>
  );
}
