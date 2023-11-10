import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SheetViewer = () => {
  const navigate = useNavigate();
  const { characterId } = useParams();

  const [characterDetails, setCharacterDetails] = useState(null);
  const [className, setClassName] = useState(null);
  const [raceName, setRaceName] = useState(null);

  useEffect(() => {
    if (characterId) {
      fetch(`/api/character/${characterId}`)
        .then((response) => response.json())
        .then((data) => {
          setCharacterDetails(data);
          fetchClassDetails(data.CLASS);
          fetchRaceDetails(data.RACE);
        })
        .catch((error) =>
          console.error("Error fetching character details:", error)
        );
    }
  }, [characterId]);

  const fetchClassDetails = (classId) => {
    fetch(`/api/class/${classId}`)
      .then((response) => response.json())
      .then((data) => setClassName(data.NAME))
      .catch((error) => console.error("Error fetching class details:", error));
  };

  const fetchRaceDetails = (raceId) => {
    fetch(`/api/race/${raceId}`)
      .then((response) => response.json())
      .then((data) => setRaceName(data.NAME))
      .catch((error) => console.error("Error fetching race details:", error));
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Sheet Viewer</h1>
      <button onClick={handleBackToHome}>Back to Home Page</button>
      {characterDetails && (
        <div>
          <h2>{characterDetails.CHARACTER_NAME}</h2>
          <h2>{characterDetails.PRONOUNS}</h2>
          <h2>{characterDetails.BACKGROUND}</h2>
          <h2>{className}</h2>
          <h2>{raceName}</h2>
        </div>
      )}
    </div>
  );
};

export default SheetViewer;
