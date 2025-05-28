import React from 'react';
import CardList from '../../components/CardList/CardList.js';
import "./BooksPage.css";

const books = [
  {
    id: 1,
    photo: 'https://books.toscrape.com/media/cache/08/e9/08e94f3731d7d6b760dfbfbc02ca5c62.jpg',
    rating: 4.8,
    title: 'JavaScript: The Good Parts',
    price: 25.99,
    stock: 5,
  },
  {
    id: 2,
    photo: 'https://books.toscrape.com/media/cache/fe/72/fe72f0532301ec28892ae79a629a293c.jpg',
    rating: 4.3,
    title: 'You Don’t Know JS',
    price: 30.0,
    stock: 0,
  },
  {
    id: 2,
    photo: 'https://books.toscrape.com/media/cache/fe/72/fe72f0532301ec28892ae79a629a293c.jpg',
    rating: 4.3,
    title: 'You Don’t Know JS',
    price: 30.0,
    stock: 0,
  },
  {
    id: 2,
    photo: 'https://books.toscrape.com/media/cache/fe/72/fe72f0532301ec28892ae79a629a293c.jpg',
    rating: 4.3,
    title: 'You Don’t Know JS',
    price: 30.0,
    stock: 0,
  },
  {
    id: 2,
    photo: 'https://books.toscrape.com/media/cache/fe/72/fe72f0532301ec28892ae79a629a293c.jpg',
    rating: 4.3,
    title: 'You Don’t Know JS',
    price: 30.0,
    stock: 0,
  },


];

export default function BooksPage() {
  return (
    <div>
      <h1>Books List</h1>
      <CardList books={books} />
    </div>
  );
}
