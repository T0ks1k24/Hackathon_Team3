import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.js';
import RegisterPage from './pages/RegisterPage/RegisterPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import BooksPage from './pages/BooksPage/BooksPage.js';
import Header from './components/Header/Header.js';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import PrivateRoute from './security/PrivateRoute.jsx';
import PublicRoute from './security/PublicRoute.jsx';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/register" element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          } />

          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />


          <Route path="/books" element={
            <PrivateRoute>
              <BooksPage />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;