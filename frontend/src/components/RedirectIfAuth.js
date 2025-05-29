import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectIfAuth({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/books");
    }
  }, [navigate]);

  return children;
}
