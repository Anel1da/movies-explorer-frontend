import { Link } from "react-router-dom";
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
          <Link href="#" className="footer__link" target="_blank">
            Яндекс.Практикум
          </Link>
          <Link href="#" className="footer__link" target="_blank">
            Github
          </Link>
          <Link href="#" className="footer__link" target="_blank">
            Facebook
          </Link>
        </div>
      </div>
    </div>
  );
}
