import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const [characterSheets, setCharacterSheets] = useState([]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/character/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update the characterSheets after successful deletion
        const updatedSheets = characterSheets.filter((sheet) => sheet.id !== id);
        setCharacterSheets(updatedSheets);
      } else {
        console.error('Failed to delete character sheet');
      }
    } catch (error) {
      console.error('Error deleting character sheet:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/character");
        if (response.ok) {
          const data = await response.json();
          setCharacterSheets(data);
        } else {
          console.error("Failed to fetch character sheets");
        }
      } catch (error) {
        console.error("Error fetching character sheets:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h1 className="text-fuchsia">Cotton Candy Land</h1>
      <Link to="/sheetCreator">
        <button className="btn custom-btn m-3">Create Character Sheet</button>
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
