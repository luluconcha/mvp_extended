import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth.js";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const navigate = useNavigate();

  function onLogin() {
    setIsLoggedIn(true);
    navigate("/private");
  }

  function onLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/login");
  }

  const authObject = {
    isLoggedIn,
    onLogin,
    onLogout,
  };

  return (
    <AuthContext.Provider value={authObject}>{children}</AuthContext.Provider>
  );
}