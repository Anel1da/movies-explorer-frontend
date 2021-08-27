import "./AboutMe.css";
import { Link } from "react-router-dom";
import studentPhoto from "../../images/pic__COLOR_pic.png";

export default function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__description">
          <h2 className="about-me__name">Виталий</h2>
          <h3 className="about-me__job">Фронтенд-разработчик, 30 лет</h3>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <div className="about-me__links">
            <Link className="about-me__link" href="#">
              Facebook
            </Link>
            <Link className="about-me__link" href="#">
              Github
            </Link>
          </div>
        </div>
        <img
          className="about-me__image"
          src={studentPhoto}
          alt="Моя фотография"
        />
      </div>
    </section>
  );
}
