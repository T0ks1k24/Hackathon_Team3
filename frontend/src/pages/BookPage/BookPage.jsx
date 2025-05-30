import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookPage.css';

const API_URL = "http://localhost:8000/api/books/book";

export default function BookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`${API_URL}/${id}/`);
        if (!response.ok) throw new Error("Failed to fetch book");
        const data = await response.json();

        const formattedBook = {
          ...data,
          rating: parseFloat(data.rating) || 0,
          price: parseFloat(data.price) || 0,
        };

        setBook(formattedBook);
      } catch (error) {
        console.error(error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!book) return <p className="error">Book not found</p>;

  return (
    <div className="container">
      <h2 className="title">{book.title}</h2>
      <img src={book.image} alt={book.title} className="bookImage" />
      <div className="infoRow">
        <span className="infoLabel">Rating:</span>
        <span>⭐ {book.rating.toFixed(1)} / 5</span>
      </div>
      <div className="infoRow">
        <span className="infoLabel">Price:</span>
        <span>${book.price.toFixed(2)}</span>
      </div>
      <div className="infoRow">
        <span className="infoLabel">Availability:</span>
        <span className={`status ${book.availability > 0 ? '' : 'outOfStock'}`}>
          {book.availability > 0 ? `In stock: ${book.availability}` : 'Out of stock'}
        </span>
      </div>
      <div className="infoRow">
        <span className="infoLabel">Year:</span>
        <span>{book.year}</span>
      </div>
      <div className="infoRow">
        <span className="infoLabel">Genre:</span>
        <span>{book.genre?.name || 'N/A'}</span>
      </div>
      <div className="description">
        <strong>Description:</strong>
        <p>{book.description}</p>
      </div>
      <div className="infoRow">
        <span className="infoLabel">UPC Code:</span>
        <span>{book.upc_code}</span>
      </div>
    </div>
  );
}
