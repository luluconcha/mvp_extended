import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [characterSheets, setCharacterSheets] = useState([]);
  const [user, setUser] = useState([])


  useEffect(() => {
  }, []);

  return (
    <div className="container text-center mt-5">
    
      <Link to="/storypoints">
        <button className="btn custom-btn m-3">Story map</button>
      </Link>

  

    </div>
  );
};

export default HomePage;
