import React, { useState, useEffect } from 'react';
import './admin.css';

function AdminPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [upsCode, setUpsCode] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [availability, setAvailability] = useState('available');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch('http://3.77.211.196/api/books/genres/');
        const data = await response.json();
        setGenres(data.results);
      } catch (error) {
        console.error('Помилка при завантаженні жанрів:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBook = {
      title,
      price,
      image_url: imageUrl,
      description,
      year,
      ups_code: upsCode,
      genre,
      availability,
      quantity,
    };

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert('Книгу додано!');
        // Очистити форму
        setTitle('');
        setPrice('');
        setImageUrl('');
        setDescription('');
        setYear('');
        setUpsCode('');
        setGenre('');
        setAvailability('available');
        setQuantity('');
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
        <label style={{ display: 'block', marginBottom: 8, fontWeight: '600', color: '#333' }}>
  Опис:
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    required
    style={{
      width: '100%',
      minHeight: '120px',
      padding: '10px',
      borderRadius: '8px',
      border: '1.5px solid #ccc',
      fontSize: '16px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      resize: 'vertical',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      transition: 'border-color 0.3s ease',
      marginTop: '6px',
    }}
    onFocus={(e) => e.target.style.borderColor = '#007BFF'}
    onBlur={(e) => e.target.style.borderColor = '#ccc'}
  />
</label>
        <label>
          Рік:
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </label>
        <label>
          Код UPS:
          <input type="text" value={upsCode} onChange={(e) => setUpsCode(e.target.value)} required />
        </label>
        <label>
          Жанр:
          <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
            <option value="">Оберіть жанр</option>
            {genres.map((g) => (
              <option key={g.id} value={g.name}>{g.name}</option>
            ))}
          </select>
        </label>
        <label>
          Кількість книг:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </label>
        <button type="submit">Додати</button>
      </form>
    </div>
  );
}

export default AdminPage;
