import React from 'react';
import Card from '../Card/Card.js';
import styles from './CardList.module.css';

export default function CardList({ books }) {
  if (!books || books.length === 0) {
    return <p className={styles.empty}>No books available</p>;
  }

  return (
    <div className={styles.list}>
      {books.map((book, index) => (
        <Card
          key={book.id || index}
          photo={book.photo}
          rating={book.rating}
          title={book.title}
          price={book.price}
          stock={book.stock}
        />
      ))}
    </div>
  );
}
