// eslint-disable-next-line
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Головна</Link>
        <Link to="/books" className={styles.link}>Бібліотека</Link>
        <Link to="/profile" className={styles.link}>Профіль</Link>
      </nav>
    </header>
  );
}
