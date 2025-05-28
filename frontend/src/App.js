import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import BooksPage from './pages/BooksPage/BooksPage.js';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '1rem', background: '#eee' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Головна</Link>
          <Link to="/register" style={{ marginRight: '1rem' }}>register</Link>

        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/books" element={<BooksPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
