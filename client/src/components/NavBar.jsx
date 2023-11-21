import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const { isLoggedIn, onLogout } = useAuth();
  return (
    <div className="navbar">
      <Link to="/"><button>home</button></Link>
        {!isLoggedIn && <Link to="/login"><button>login</button></Link>}
        {isLoggedIn && <Link to="/private"><button>my page</button></Link>}
        {isLoggedIn && <button onClick={onLogout}>logout</button>}
    </div>
  );
}