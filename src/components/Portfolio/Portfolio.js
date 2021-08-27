import "./Portfolio.css";
import { Link } from "react-router-dom";
import linkArrow from "../../images/link-arrow.svg";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__links">
        <Link href="#" className="portfolio__link" target="_blank">
          <p> Статичный сайт</p>
          <img src={linkArrow} alt="link" className="portfolio__linkarrow" />
        </Link>
        <Link className="portfolio__link" href="#" target="_blank">
          <p>Адаптивный сайт</p>
          <img src={linkArrow} alt="link" className="portfolio__linkarrow" />
        </Link>
        <Link className="portfolio__link" href="#" target="_blank">
          <p>Одностраничное приложение</p>
          <img src={linkArrow} alt="link" className="portfolio__linkarrow" />
        </Link>
      </div>
    </section>
  );
}
