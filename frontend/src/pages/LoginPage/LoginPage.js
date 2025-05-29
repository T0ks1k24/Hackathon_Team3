import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/user/userFetch";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await loginUser({ email, password });
      setUserInfo(data.user);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);

      navigate("/books");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {userInfo && (
        <p style={{ color: "green" }}>
          Welcome, {userInfo.first_name || userInfo.username}!
        </p>
      )}
    </form>
  );
}
