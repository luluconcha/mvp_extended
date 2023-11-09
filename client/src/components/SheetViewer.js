import React, { useEffect, useState } from "react";

const SheetViewer = ({ onBackToHome, characterId }) => {
  const [characterDetails, setCharacterDetails] = useState(null);
  const [className, setClassName] = useState(null);
  const [raceName, setRaceName] = useState(null);

  useEffect(() => {
    if (characterId) {
      // Fetch character details based on the id
      fetch(`http://localhost:4000/character/${characterId}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacterDetails(data);
          fetchClassDetails(data.CLASS);
          fetchRaceDetails(data.RACE);
        })
        .catch((error) => console.error("Error fetching character details:", error));
    }
  }, [characterId]);

  const fetchClassDetails = (classId) => {
    // Fetch class details based on the class id
    fetch(`http://localhost:4000/class/${classId}`)
      .then((response) => response.json())
      .then((data) => setClassName(data.NAME))
      .catch((error) => console.error("Error fetching class details:", error));
  };

  const fetchRaceDetails = (raceId) => {
    // Fetch class details based on the class id
    fetch(`http://localhost:4000/race/${raceId}`)
      .then((response) => response.json())
      .then((data) => setRaceName(data.NAME))
      .catch((error) => console.error("Error fetching class details:", error));
  };

  return (
    <div>
      <h1>Sheet Viewer</h1>
      <button onClick={onBackToHome}>Back to Home Page</button>
      {characterDetails && (
        <div>
          {/* Render character details here */}
          <h2>{characterDetails.CHARACTER_NAME}</h2>
          <h2>{characterDetails.PRONOUNS}</h2>
          <h2>{characterDetails.BACKGROUND}</h2>
          <h2>{className}</h2>
          <h2>{raceName}</h2>
          {/* Include other details as needed */}
        </div>
      )}
    </div>
  );
};

export default SheetViewer;
