import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
import HomePage from './pages/HomePage/HomePage.jsx';
import RegisterPage from './pages/RegisterPage/RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import BooksPage from './pages/BooksPage/BooksPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';

import PrivateRoute from './security/PrivateRoute.jsx';
import PublicRoute from './security/PublicRoute.jsx';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>

          <Route path="/" element={<HomePage />} />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/books"
            element={
              // <PrivateRoute>
                <BooksPage />
              // </PrivateRoute>
            }
          />

        </Routes>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
