import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__date">&copy; 2021</p>
        <div className="footer__links">
          <a
            href="https://practicum.yandex.ru/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://www.facebook.com/"
            className="footer__link"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
