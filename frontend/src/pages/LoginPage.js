import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username) {
      dispatch(login({ username }));
      alert(`Добро пожаловать, ${username}!`);
      navigate('/books');  // переход после логина
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Вход</h2>
      <input
        type="text"
        placeholder="Введите имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin} style={{ marginLeft: '1rem' }}>
        Войти
      </button>
    </div>
  );
};

export default LoginPage;
