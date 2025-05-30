import React, { useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import { fetchBooks } from '../../features/books/booksFetch';

export default function BookPage() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const data = await fetchBooks(page);
      const formattedBooks = data.results.map(book => ({
        id: book.id,
        photo: book.image,
        rating: book.rating || 0,
        title: book.title,
        price: book.price || 0,
        stock: book.availability || 0,
      }));
      setBooks(formattedBooks);
      setTotalPages(Math.ceil(data.count / 20)); // Adjust if PAGE_SIZE changes
      setLoading(false);
    };

    loadBooks();
  }, [page]);

  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));
  const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages));

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Книги</h1>
      <CardList books={books} />
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={handlePrev} disabled={page === 1}>← Назад</button>
        <span>Сторінка {page} з {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages}>Вперед →</button>
      </div>
    </div>
  );
}
