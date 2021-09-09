import "./Portfolio.css";
import { Link } from "react-router-dom";
import linkArrow from "../../images/link-arrow.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__links">
        <a
          href="https://github.com/Anel1da/how-to-learn"
          className="portfolio__link"
          target="_blank"
          rel="noreferrer"
        >
          <p> Статичный сайт</p>
          <img src={linkArrow} alt="link" className="portfolio__linkarrow" />
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/Anel1da/russian-travel"
          target="_blank"
          rel="noreferrer"
        >
          <p>Адаптивный сайт</p>
          <img src={linkArrow} alt="link" className="portfolio__linkarrow" />
        </a>
        <a
          className="portfolio__link"
          href="https://github.com/Anel1da/react-mesto-api-full"
          target="_blank"
          rel="noreferrer"
        >
          <p>Одностраничное приложение</p>
          <img src={linkArrow} alt="link" className="portfolio__linkarrow" />
        </a>
      </div>
    </section>
  );
}
