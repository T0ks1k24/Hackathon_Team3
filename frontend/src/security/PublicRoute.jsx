import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  return !token ? children : <Navigate to="/books" />;
}
