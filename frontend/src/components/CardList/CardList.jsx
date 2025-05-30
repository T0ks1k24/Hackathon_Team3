import React from 'react';
import Card from '../Card/Card.jsx';
import './CardList.css';

export default function CardList({ books }) {
  if (!books || books.length === 0) {
    return (
      <section className="card-list-empty">
        <p className="empty">No books available</p>
      </section>
    );
  }

  return (
    <section className="card-list-section">
      <ul className="card-list">
        {books.map((book) => (
          <li key={book.id} className="card-list-item">
            <Card
              id={book.id}                
              photo={book.photo}
              rating={book.rating}
              title={book.title}
              price={book.price}
              stock={book.stock}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
