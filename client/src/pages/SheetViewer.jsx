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
  const [typeName, setTypeName] = useState(null);
  const [typeDescription, setTypeDescription] = useState(null);
  const [inventoryList, setInventoryList] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    if (characterId) {
      fetch(`/api/users/${userId}/characters`)
        .then((response) => response.json())
        .then((data) => {
          setCharacterDetails(data);
          fetchClassDetails(data.CLASS);
          fetchTypeDetails(data.TYPE);
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

  const fetchTypeeDetails = (typeId) => {
    fetch(`/api/type/${typeId}`)
      .then((response) => response.json())
      .then((data) => {
        setTypeName(data.NAME);
        setTypeDescription(data.DESCRIPTION);
      })
      .catch((error) => console.error("Error fetching type details:", error));
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container className="SheetViewer">
      <Button className="btn btn-info mt-3 mx-auto d-block" onClick={handleBackToHome}>
        Back to Home Page
      </Button> 

      <h1 style={{ color: 'fuchsia', textDecoration: 'underline' }}>Character Sheet</h1>
      

      {characterDetails && (
        <Row>
          <Col xs={12} md={9}>
            <div>
            <h2 style={{ color: 'fuchsia' }}>Name: <span style={{ color: '#DFFF00', fontSize: '23px' }}>{characterDetails.CHARACTER_NAME}</span></h2>
          <h2 style={{ color: 'fuchsia' }}>Pronouns: <span style={{ color: '#DFFF00', fontSize: '23px'  }}>{characterDetails.PRONOUNS}</span></h2>
          <h2 style={{ color: 'fuchsia' }}>Background: <span style={{ color: '#DFFF00', fontSize: '23px'  }}>{characterDetails.BACKGROUND}</span></h2>
          <h2 style={{ color: 'fuchsia' }}>Class: <span style={{ color: '#DFFF00', fontSize: '23px'  }}>{className}</span></h2>
          <p style={{ color: 'fuchsia' }}>{classDescription}</p>
          <h2 style={{ color: 'fuchsia' }}>Type: <span style={{ color: '#DFFF00', fontSize: '23px'  }}>{typeName}</span></h2>
          <p style={{ color: 'fuchsia' }}>{typeDescription}</p>
          <h2 style={{ color: 'fuchsia' }}>Level: <span style={{ color: '#DFFF00', fontSize: '23px'  }}>{characterDetails.LEVEL}</span></h2>
          <h2 style={{ color: 'fuchsia' }}>Inventory:</h2>
              <ul>
                {inventoryItems.map((item) => (
                  <li key={item.id} style={{ color: 'fuchsia' }}>
                    <span style={{ color: '#DFFF00' }}>{item.NAME}:</span> {item.DESCRIPTION}
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
