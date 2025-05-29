import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parseJwt from "../../security/parseJwt.js";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const userData = refreshToken ? parseJwt(refreshToken) : null;

  useEffect(() => {
    if (!accessToken || !userData) {
      navigate("/login");
    }
  }, [accessToken, userData, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!accessToken || !userData) return null;

  return (
    <div className="profile-container">
      <h2>Профіль користувача</h2>
      <div className="profile-info">
        <p><strong>Ім’я користувача:</strong> {userData.name || "—"}</p>
        <p><strong>Ім’я:</strong> {userData.first_name || "—"}</p>
        <p><strong>Прізвище:</strong> {userData.last_name || "—"}</p>
        <p><strong>Email:</strong> {userData.email || "—"}</p>
        <p><strong>Роль:</strong> {userData.role || "—"}</p>
      </div>

      <button onClick={handleLogout} className="logout-button">
        Вийти
      </button>
    </div>
  );
}
