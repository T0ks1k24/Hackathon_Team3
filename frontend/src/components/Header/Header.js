import React from "react";
import { Link } from "react-router-dom";
import "./Header.module.css"; 

export default function Header() {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Головна</Link>
          </li>
          <li>
            <Link to="/books">Магазин</Link>
          </li>
          <li>
            <Link to="/login">Вхід</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
