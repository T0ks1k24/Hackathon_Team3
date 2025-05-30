import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BooksPage from "./pages/BooksPage/BooksPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import BookPage from "./pages/BookPage/BookPage";
import PrivateRoute from "./security/PrivateRoute";
import PublicRoute from "./security/PublicRoute";
import AdminPage from "./admin/AdminPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <div className="app-container">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/books/:id" element={<BookPage />} />
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
                  <PrivateRoute>
                    <BooksPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  // <PrivateRoute>
                  <AdminPage />
                  // </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
