import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBookById } from "../../features/books/booksFetch";
import "./BookPage.css";

export default function BookPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch (error) {
        console.error("Помилка завантаження книги:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) return <p className="loading">Завантаження книги...</p>;
  if (!book) return <p className="error">Книгу не знайдено.</p>;

  return (
    <div className="book-detail-page">
      <button className="back-button" onClick={() => navigate("/books")}>
        ← Назад до каталогу
      </button>

      <div className="book-container">
        <img className="book-image" src={book.image} alt={book.title} />
        <div className="book-info">
          <h1 className="book-title">{book.title}</h1>
          <p><strong>Рейтинг:</strong> {book.rating}</p>
          <p><strong>Опис:</strong> {book.description}</p>
          <p><strong>Ціна:</strong> {book.price} $</p>
          <p><strong>Наявність:</strong> {book.availability}</p>
        </div>
      </div>
    </div>
  );
}
