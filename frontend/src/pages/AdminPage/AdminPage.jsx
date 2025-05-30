import React, { useState, useEffect } from 'react';
import parseJwt from '../../security/parseJwt';
import './AdminPage.css';

export default function AdminPage() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    const payload = parseJwt(token);
    console.log('JWT payload:', payload);
    if (payload?.is_staff === true) {
      setRole('admin');
    } else {
      setRole('user');
    }
  } else {
    setRole('guest');
  }
}, []);


  const handleUpdateData = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('https://3.77.211.196/api/books/import-book/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Помилка: ${response.statusText}`);
      }

      await response.json();
      setMessage('Дані успішно оновлено!');
    } catch (error) {
      setMessage(`Помилка оновлення: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (role === null) return <p className="admin-loading">🔄 Перевірка авторизації...</p>;

  if (role !== 'admin') {
    return <p className="admin-forbidden">⛔ Доступ заборонено. Лише для адміністратора.</p>;
  }

  return (
    <div className="admin-page">
      <h1>Панель адміністратора</h1>
      <button onClick={handleUpdateData} className="admin-button" disabled={loading}>
        {loading ? 'Оновлення...' : '🔁 Оновити дані'}
      </button>
      {message && <p className="admin-message">{message}</p>}
    </div>
  );
}
