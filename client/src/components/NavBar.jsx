import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const { isLoggedIn, onLogout } = useAuth();
  return (
    <div>
      <Link to="/">Home</Link> 
      {!isLoggedIn && <Link to="/login">user outer-space</Link>}
      {isLoggedIn && <Link to="/private">Private</Link>}
      {isLoggedIn && <button onClick={onLogout}>Logout</button>}
    </div>
  );
}