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
      <h1 className="text-fuchsia">Cotton Candy Land</h1>
      <Link to="/storypoints">
        <button className="btn custom-btn m-3">Play</button>
      </Link>
      <Link to="/login">
        <button className="btn custom-btn m-3">Play for real</button>
      </Link>
  
      <h2 className="text-fuchsia">Character Sheets</h2>
      <div className="row1 d-flex justify-content-center align-items-center">
        <ul className="list-unstyled">
          {characterSheets.map((sheet) => (
            <li key={sheet.id} className="mb-3">
              <Link to={`/sheetViewer/${sheet.id}`} className="character-sheet-link">
                {sheet.CHARACTER_NAME}
              </Link>
              <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(sheet.id)} style={{ fontSize: '10px' }}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
