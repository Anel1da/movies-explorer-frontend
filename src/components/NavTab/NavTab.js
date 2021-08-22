import React from "react";
import { Link } from "react-router-dom";
import "./NavTab.css";

export default function NavTab() {
  return (
    <nav className="navtab">
      <ul className="navtab__navigation">
        <li>
          <a href="#about" className="navtab__link">
            О проекте
          </a>
        </li>
        <li>
          <a href="#tech" className="navtab__link">
            Технологии
          </a>
        </li>
        <li>
          <a href="#student" className="navtab__link">
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
}
