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
    <div>
      <h1>Home Page</h1>
      <Link to="/sheetCreator">
        <button>Create Character Sheet</button>
      </Link>
      <h2>Character Sheets</h2>
      <div className="row1">
      <ul>
        {characterSheets.map((sheet) => (
          <li key={sheet.id}>
            <Link to={`/sheetViewer/${sheet.id}`}>
              {sheet.CHARACTER_NAME}
            </Link>
            <button type="button" class="btn btn-outline-dark smaller-button" onClick={() => handleDelete(sheet.id)} style={{ fontSize: '10px' }}>X</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default HomePage;
