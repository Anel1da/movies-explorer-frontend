import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__navigation">
        <li className="navtab__link-item">
          <a href="#about" className="navtab__link">
            О проекте
          </a>
        </li>
        <li className="navtab__link-item">
          <a href="#tech" className="navtab__link">
            Технологии
          </a>
        </li>
        <li className="navtab__link-item">
          <a href="#student" className="navtab__link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
