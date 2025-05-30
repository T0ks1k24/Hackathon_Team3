import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import parseJwt from "../../security/parseJwt.js";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  console.log("Access Token:", accessToken);
  
  const userData = accessToken ? parseJwt(accessToken) : null;
  console.log("User Data parsed from token:", userData);

  useEffect(() => {
    if (!accessToken || !userData) {
      console.log("Redirecting to login because no token or no user data");
      navigate("/login");
    }
  }, [accessToken, userData, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!accessToken || !userData) {
    // Поки чекаємо редіректу - показуємо хоч щось (щоб не було повної пустоти)
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Профіль користувача</h2>
      <div className="profile-info">
        <p><strong>Ім’я користувача:</strong> {userData.username || "—"}</p>
        <p><strong>Ім’я:</strong> {userData.first_name || "—"}</p>
        <p><strong>Прізвище:</strong> {userData.last_name || "—"}</p>
        <p><strong>Email:</strong> {userData.email || "—"}</p>
        <p><strong>Роль:</strong> {userData.isStaff ? "Admin" : "User"}</p>

      </div>

      <button onClick={handleLogout} className="logout-button">
        Вийти
      </button>
    </div>
  );
}
