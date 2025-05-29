import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Ласкаво просимо до Бібліотеки</h1>
        <p>Знання починаються тут. Знайдіть, прочитайте, досліджуйте.</p>
      </header>
      <main className="homepage-content">
        <section className="homepage-section">
          <h2>Про бібліотеку</h2>
          <p>
            Наша бібліотека пропонує великий вибір друкованих та електронних книг, наукових статей і ресурсів для всіх вікових категорій.
          </p>
        </section>
        <section className="homepage-section">
          <h2>Що ви можете зробити</h2>
          <ul>
            <li>Шукати книги за автором або назвою</li>
            <li>Читати книги онлайн</li>
            <li>Бронювати книги</li>
            <li>Отримувати рекомендації</li>
          </ul>
        </section>
      </main>
      <footer className="homepage-footer">
        <p>© {new Date().getFullYear()} Бібліотека. Усі права захищено.</p>
      </footer>
    </div>
  );
};

export default HomePage;
