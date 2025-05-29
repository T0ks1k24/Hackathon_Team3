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

        <section className="homepage-section">
          <h2>Як користуватись</h2>
          <ol>
            <li>Зареєструйтесь або увійдіть до свого акаунта</li>
            <li>Використовуйте пошук на сторінці книг</li>
            <li>Переглядайте опис, доступність та рейтинг книги</li>
            <li>Додавайте книги у список бажаного або бронюйте</li>
          </ol>
        </section>

        <section className="homepage-section">
          <h2>Новини та оновлення</h2>
          <p>
            Ми регулярно оновлюємо наш каталог новими книгами, статтями та іншими ресурсами. Слідкуйте за оновленнями, щоб не пропустити цікаві новинки!
          </p>
        </section>
      </main>
    </div>
  );
};

export default HomePage;