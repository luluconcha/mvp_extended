import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SheetViewer from "./components/SheetViewer";
import SheetCreator from "./components/SheetCreator";
import "./App.css";

function App() {
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
    fetch("/api/character")
      .then((response) => response.json())
      .then((data) => setCharacterSheets(data))
      .catch((error) =>
        console.error("Error fetching character sheets:", error)
      );
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/sheetCreator" element={<SheetCreator />} />
        <Route path="/sheetViewer/:characterId" element={<SheetViewer />} />
        <Route
          path="/"
          element={
            <div>
              <h1>Home Page</h1>
              <Link to="/sheetCreator">
                <button>Create Character Sheet</button>
              </Link>
              <h2>Character Sheets</h2>
              <ul>
                {characterSheets.map((sheet) => (
                  <li key={sheet.id}>
                    <Link to={`/sheetViewer/${sheet.id}`}>
                      {sheet.CHARACTER_NAME}
                    </Link>
                    <button onClick={() => handleDelete(sheet.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
