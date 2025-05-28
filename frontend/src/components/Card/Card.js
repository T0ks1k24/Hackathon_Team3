import React from 'react';
import styles from './Card.module.css';

export default function Card({ photo, rating, title, price, stock }) {
  return (
    <div className={styles.card}>
      <img src={photo} alt={title} className={styles.photo} />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.rating}>Rating: {rating} / 5</p>
        <p className={styles.price}>Price: ${price}</p>
        <p className={`${styles.stock} ${stock > 0 ? styles.inStock : styles.outOfStock}`}>
          {stock > 0 ? `In stock: ${stock}` : 'Out of stock'}
        </p>
      </div>
    </div>
  );
}
