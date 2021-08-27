import React from "react";
import "./MoviesCard.css";
import film from "../../images/film.svg";

export default function MoviesCard() {
  return (
    <>
      <div className="movie">
        <div className="movie__container">
          <img className="movie__image" src={film} alt="заставка фильма" />
          <div className="movie__info">
            <h3 className="movie__title">
              Gimme Danger: История Игги и The Stooges
            </h3>
            <p className="movie__duration">1ч 17м</p>
          </div>
          <button type="button" className="movie__saveBtn"></button>
        </div>
      </div>

      <div className="movie">
        <div className="movie__container">
          <img className="movie__image" src={film} alt="заставка фильма" />
          <div className="movie__info">
            <h3 className="movie__title">
              Gimme Danger: История Игги и The Stooges
            </h3>
            <p className="movie__duration">1ч 17м</p>
          </div>
          <button
            type="button"
            className="movie__saveBtn movie__saveBtn_saved"
          ></button>
        </div>
      </div>
      <div className="movie">
        <div className="movie__container">
          <img className="movie__image" src={film} alt="заставка фильма" />
          <div className="movie__info">
            <h3 className="movie__title">
              Gimme Danger: История Игги и The Stooges
            </h3>
            <p className="movie__duration">1ч 17м</p>
          </div>
          <button
            type="button"
            className="movie__saveBtn movie__saveBtn_saved"
          ></button>
        </div>
      </div>
      <div className="movie">
        <div className="movie__container">
          <img className="movie__image" src={film} alt="заставка фильма" />
          <div className="movie__info">
            <h3 className="movie__title">
              Gimme Danger: История Игги и The Stooges
            </h3>
            <p className="movie__duration">1ч 17м</p>
          </div>
          <button
            type="button"
            className="movie__saveBtn movie__saveBtn_saved"
          ></button>
        </div>
      </div>
    </>
  );
}
