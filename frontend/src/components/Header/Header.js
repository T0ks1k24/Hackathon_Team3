import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../setting/ThemeContext.js";
import { FaSun, FaMoon } from 'react-icons/fa';
import styles from "./Header.module.css";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.link}>Головна</Link>
          <Link to="/books" className={styles.link}>Бібліотека</Link>
          <Link to="/profile" className={styles.link}>Профіль</Link>
        </div>
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </nav>
    </header>
  );
}