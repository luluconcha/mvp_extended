import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./SheetViewer.css";

const SheetViewer = () => {
  const navigate = useNavigate();
  const { characterId } = useParams();
  const [characterDetails, setCharacterDetails] = useState(null);
  const [className, setClassName] = useState(null);
  const [classDescription, setClassDescription] = useState(null);
  const [raceName, setRaceName] = useState(null);
  const [raceDescription, setRaceDescription] = useState(null);
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
      .then((data) => {
        setClassName(data.NAME);
        setClassDescription(data.DESCRIPTION);
      })
      .catch((error) => console.error("Error fetching class details:", error));
  };

  const fetchRaceDetails = (raceId) => {
    fetch(`/api/race/${raceId}`)
      .then((response) => response.json())
      .then((data) => {
        setRaceName(data.NAME);
        setRaceDescription(data.DESCRIPTION);
      })
      .catch((error) => console.error("Error fetching race details:", error));
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <h1>Sheet Viewer</h1>
      <Button className="btn btn-info" onClick={handleBackToHome}>
        Back to Home Page
      </Button>

      {characterDetails && (
        <Row>
          <Col xs={12} md={9}>
            <div>
              <h2>Name: {characterDetails.CHARACTER_NAME}</h2>
              <h2>Pronouns: {characterDetails.PRONOUNS}</h2>
              <h2>Background: {characterDetails.BACKGROUND}</h2>
              <h2>Class: {className}</h2>
              <p>{classDescription}</p>
              <h2>Race: {raceName}</h2>
              <p>{raceDescription}</p>
              <h2>Level: {characterDetails.LEVEL}</h2>
              <h2>Inventory:</h2>
              <ul>
                {inventoryItems.map((item) => (
                  <li key={item.id}>
                    {item.NAME}: {item.DESCRIPTION}
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          <Col xs={12} md={3}>
            <div>
              <h2>
                <label className="attribute-label">Strength</label>
                <span className="attribute-number">{characterDetails.STRENGTH}</span>
              </h2>
              <h2>
                <label className="attribute-label">Dexterity</label>
                <span className="attribute-number">{characterDetails.DEXTERITY}</span>
              </h2>
              <h2>
                <label className="attribute-label">Resilience</label>
                <span className="attribute-number">{characterDetails.RESILIENCE}</span>
              </h2>
              <h2>
                <label className="attribute-label">Magic</label>
                <span className="attribute-number">{characterDetails.MAGIC}</span>
              </h2>
              <h2>
                <label className="attribute-label">Cuteness</label>
                <span className="attribute-number">{characterDetails.CUTENESS}</span>
              </h2>
            </div>
          </Col>
        </Row>
      )}
    </Container>
    
  );
};

export default SheetViewer;
