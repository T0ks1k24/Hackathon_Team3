import React, { useState } from 'react';
import './admin.css';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      price,
      image_url: imageUrl,
    };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert('Книгу додано!');
        setTitle('');
        setPrice('');
        setImageUrl('');
      } else {
        alert('Помилка при додаванні книги');
      }
    } catch (err) {
      alert('Сервер недоступний');
    }
  };

  return (
    <div className="admin-container">
      <h2>Додати нову книгу</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>
          Назва книги:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Ціна:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <label>
          Посилання на зображення:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </label>
        <button type="submit">Додати</button>
      </form>
    </div>
  );
}

export default AdminPage;
