import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, loginUser } from "../../features/user/userFetch.js";
import "./RegisterPage.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // 🔒 Redirect if already authenticated
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/books");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.password2) {
      setError("Паролі не співпадають");
      return;
    }

    try {
      // 📝 РЕЄСТРАЦІЯ
      await registerUser(formData);

      // 🔐 ЛОГІН ПІСЛЯ РЕЄСТРАЦІЇ
      const loginData = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("accessToken", loginData.access);
      localStorage.setItem("refreshToken", loginData.refresh);

      // 🔁 Перехід на сторінку після логіну
      navigate("/books");
    } catch (err) {
      setError(err.message || "Помилка під час реєстрації або логіну");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">Реєстрація</h2>

        <input
          type="text"
          name="username"
          placeholder="Ім'я користувача"
          value={formData.username}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="text"
          name="first_name"
          placeholder="Ім'я"
          value={formData.first_name}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Прізвище"
          value={formData.last_name}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
          className="register-input"
        />
        <input
          type="password"
          name="password2"
          placeholder="Підтвердіть пароль"
          value={formData.password2}
          onChange={handleChange}
          required
          className="register-input"
        />

        <button type="submit" className="register-button">Зареєструватись</button>

        {error && <p className="register-error">{error}</p>}
        {success && <p className="register-success">{success}</p>}

        <p className="login-text">
          Вже маєте акаунт?{" "}
          <Link to="/login" className="login-link">Увійти</Link>
        </p>
      </form>
    </div>
  );
}
