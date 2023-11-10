import React, { useState, useEffect } from "react";
import SheetViewer from "./components/SheetViewer";
import SheetCreator from "./components/SheetCreator";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [characterSheets, setCharacterSheets] = useState([]);

  useEffect(() => {
    fetch("/api/character")
      .then((response) => response.json())
      .then((data) => setCharacterSheets(data))
      .catch((error) =>
        console.error("Error fetching character sheets:", error)
      );
  }, []);

  const handleViewChange = (view, characterId = null) => {
    setCurrentView(view);
    setSelectedCharacterId(characterId);
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedCharacterId(null);
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return (
          <div>
            <h1>Home Page</h1>
            <button onClick={() => handleViewChange("sheetCreator")}>
              Go to Sheet Creator
            </button>
            <h2>Character Sheets</h2>
            <ul>
              {characterSheets.map((sheet) => (
                <li
                  key={sheet.id}
                  onClick={() => handleViewChange("sheetViewer", sheet.id)}
                >
                  {sheet.CHARACTER_NAME}
                </li>
              ))}
            </ul>
          </div>
        );
      case "sheetCreator":
        return <SheetCreator onBackToHome={handleBackToHome} />;
      case "sheetViewer":
        return (
          <SheetViewer
            onBackToHome={handleBackToHome}
            characterId={selectedCharacterId}
          />
        );
      default:
        return null;
    }
  };

  return <div>{renderView()}</div>;
}

export default App;
