import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SheetViewer = () => {
  const navigate = useNavigate();
  const { characterId } = useParams();

  const [characterDetails, setCharacterDetails] = useState(null);
  const [className, setClassName] = useState(null);
  const [raceName, setRaceName] = useState(null);
  const [inventoryList, setInventoryList] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);

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

      // Fetch inventory list
      fetch(`/api/inventoryList/${characterId}`)
        .then((response) => response.json())
        .then((data) => setInventoryList(data))
        .catch((error) =>
          console.error("Error fetching inventory list:", error)
        );
    }
  }, [characterId]);

  useEffect(() => {
    if (inventoryList) {
      console.log("inventoryList:", inventoryList);

      Promise.all(
        inventoryList.map((item) =>
          fetch(`/api/inventory/${item.ITEM_ID}`).then((response) =>
            response.json()
          )
        )
      )
        .then((items) => setInventoryItems(items))
        .catch((error) =>
          console.error("Error fetching inventory items:", error)
        );
    }
  }, [inventoryList]);

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
          <h2>Name: {characterDetails.CHARACTER_NAME}</h2>
          <h2>Pronouns: {characterDetails.PRONOUNS}</h2>
          <h2>Background: {characterDetails.BACKGROUND}</h2>
          <h2>Class: {className}</h2>
          <h2>Race: {raceName}</h2>
          <h2>Level: {characterDetails.LEVEL}</h2>
          <h2>Strength: {characterDetails.STRENGTH}</h2>
          <h2>Dexterity: {characterDetails.DEXTERITY}</h2>
          <h2>Resilience: {characterDetails.RESILIENCE}</h2>
          <h2>Magic: {characterDetails.MAGIC}</h2>
          <h2>Cuteness: {characterDetails.CUTENESS}</h2>
          <h2>Inventory:</h2>
          <ul>
            {inventoryItems.map((item) => (
              <li key={item.id}>{item.NAME}: {item.DESCRIPTION}</li>
            ))}
          </ul>      
          </div>
      )}
    </div>
  );
};

export default SheetViewer;
