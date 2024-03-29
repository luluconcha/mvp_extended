import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SheetCreator.css"
import { Button } from 'react-bootstrap';



const Counter = ({ attributeName, count, increaseCount, decreaseCount }) => (
  <div className="counter-container">
    <div className="counter-label">
      {attributeName} Count: 
    </div>
    <div className="counter-buttons">
      <button className="counter-btn" onClick={() => decreaseCount()}>
        -
      </button>
      <div className="counter-label">{count}</div>
      <button className="counter-btn" onClick={() => increaseCount()}>
        +
      </button>
    </div>
  </div>
);

const SheetCreator = () => {
  const navigate = useNavigate();
  // State to store input values
  const [characterName, setCharacterName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [background, setBackground] = useState("");

  const [creatureId, setCreatureId] = useState("");
  const [creatureDescription, setCreatureDescription] = useState("");
  const [cuteness, setCuteness] = useState(1);

  async function createStoryPoint() {
    try {
      const response = await fetch("/api/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: inputTitle,
          content: inputContent,
          parentID: id,
  
        })
      });
      if (!response.ok)
        throw new Error(`Oops! ${response.status} ${response.statusText}`);
      const nextPoint = await response.json();
      return nextPoint
    } catch (error) {
      setError(error.message);
      console.log("error in addCharacter function");
    } finally {
      setLoading(false);

    }
  }
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "characterName":
        setCharacterName(value);
        break;
      case "pronouns":
        setPronouns(value);
        break;
      case "background":
        setBackground(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    // Fetch class data
    fetch("/api/")
      .then((response) => response.json())
      .then((data) => setClassOptions(data))
      .catch((error) => console.error("Error fetching class data:", error));

    // Fetch type data


  }, []);

  // Handle dropdown changes
  const handleDropdownChange = async (
    e,
    setter,
    setIdSetter,
    setDescriptionSetter,
    containerType
  ) => {
    const selectedValue = parseInt(e.target.value, 10);
  
    try {
      // Check the container type and update the appropriate state
      switch (containerType) {
        case "class":
          const classResponse = await fetch(`/api/class/${selectedValue}`);
          const selectedClass = await classResponse.json();
          setter(selectedValue);
          setIdSetter(selectedValue);
          setDescriptionSetter(selectedClass ? selectedClass.DESCRIPTION : "");
          break;
        case "type":
          const typeResponse = await fetch(`/api/type/${selectedValue}`);
          const selectedType = await typeResponse.json();
          setter(selectedValue);
          setIdSetter(selectedValue);
          setDescriptionSetter(selectedType ? selectedType.DESCRIPTION : "");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Counter functions
  const increaseCount = (setter) => {
    if (setter) setter((prevCount) => Math.min(prevCount + 1, 5));
  };

  const decreaseCount = (setter) => {
    if (setter) setter((prevCount) => Math.max(prevCount - 1, 1));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Handle inventory item selection
  const handleInventoryItemSelect = (itemId, itemDescription) => {
    // Check if the item ID is already selected
    if (selectedInventoryItemIds.includes(itemId)) {
      // If selected, remove it from the array and clear the description
      setSelectedInventoryItemIds((prevIds) =>
        prevIds.filter((id) => id !== itemId)
      );
      setSelectedItemDescription(null);
    } else {
      // If not selected, add it to the array and set the description
      setSelectedInventoryItemIds((prevIds) => [...prevIds, itemId]);
      setSelectedItemDescription(itemDescription);
    }
  };

  const handleBackToHome = () => {
    navigate("/");
  };



  const handleSectionSubmit = async (e) => {
    e.preventDefault();
  
    try {
  
      // Make a POST request to your endpoint
      const response = await fetch('/api/character', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CHARACTER_NAME: characterName,
          PRONOUNS: pronouns,
          BACKGROUND: background,
          CREATURE: selectedClassId,
          CUTENESS: cuteness,

        }),
      });
  
      // Handle the response from the server
      const data = await response.json();
      console.log(data); // Log the response from the server
      navigate("/");
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="container">
    <div className="continent">
    <div>
    <div className="btn-container">
    <div className="d-flex justify-content-center align-items-center">

    </div>        
    </div>        
    <form onSubmit={handleSubmit}>
        <div className="row mb-3">
        <div className="col">
          <label>
            Character Name:
            <input
              type="text"
              name="characterName"
              value={characterName}
              onChange={handleInputChange}
              className="form-control"
            />
          </label>
        </div>
        <div className="col">
          <label>
            Pronouns:
            <input
              type="text"
              name="pronouns"
              value={pronouns}
              onChange={handleInputChange}
              className="form-control"
            />
          </label>
        </div>
        <div className="col">
          <label>
            Background:
            <textarea
              name="background"
              value={background}
              onChange={handleInputChange}
              className="form-control"
              style={{ width: '100%' }}
            />
          </label>
        </div>
      </div>
        {/* Dropdown for class selection */}
        <div className="row mb-3">
        <div className="col-5">
          <label>
            Creature:
            <select
              value={creatureId}
              onChange={(e) =>
                handleDropdownChange(
                  e,
                  setCreatureId,
                  setSelectedCreatureId,
                  setCreatureDescription,
                  "creature"
                )
              }
              className="form-select"
            >
              <option value="">Select Class</option>
              {classOptions.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.NAME}
                </option>
              ))}
            </select>
            <div>
              <h3>Selected Class Description</h3>
              <p>{classDescription}</p>
            </div>
          </label>
        </div>

        <div className="col-1">
          <label>
            Level:
            <select
              value={selectedLevel}
              onChange={(e) => {
                const selectedValue = e.target.value;
                setSelectedLevel(selectedValue);
              }}
              className="form-select"
            >
              {levelOptions.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="col-5">
          <label>
            Type:
            <select
              value={typeId}
              onChange={(e) =>
                handleDropdownChange(
                  e,
                  setTypeId,
                  setSelectedTypeId,
                  setTypeDescription,
                  "type"
                )
              }
              className="form-select"
            >
              <option value="">Select Type</option>
              {typeOptions.map((typeItem) => (
                <option key={typeItem.id} value={typeItem.id}>
                  {typeItem.NAME}
                </option>
              ))}
            </select>
            <div>
              <h3>Selected Type Description</h3>
              <p>{typeDescription}</p>
            </div>
          </label>
        </div>
      </div>
        <br />

        <div>
          <h3>All Inventory Items</h3>
          {allInventory.map((item) => (
            <div key={item.id} >
              <label className="inventory-description">
                <input
                  type="checkbox"
                  checked={selectedInventoryItemIds.includes(item.id)}
                  onChange={() => handleInventoryItemSelect(item.id, item.DESCRIPTION)}
                />
                <span style={{ color: '#DFFF00' }}>{item.NAME}</span> - Type: {item.TYPE} 
                {selectedItemDescription && selectedInventoryItemIds.includes(item.id) && (
                  <span> - Description:{" "}{item.DESCRIPTION}</span>
                )}
              </label>
            </div>
          ))}
        </div>

        <br />
        
        <Counter
          attributeName="Strength"
          count={strength}
          increaseCount={() => increaseCount(setStrength)}
          decreaseCount={() => decreaseCount(setStrength)}
        />
        <Counter
          attributeName="Dexterity"
          count={dexterity}
          increaseCount={() => increaseCount(setDexterity)}
          decreaseCount={() => decreaseCount(setDexterity)}
        />
        <Counter
          attributeName="Resilience"
          count={resilience}
          increaseCount={() => increaseCount(setResilience)}
          decreaseCount={() => decreaseCount(setResilience)}
        />
        <Counter
          attributeName="Magic"
          count={magic}
          increaseCount={() => increaseCount(setMagic)}
          decreaseCount={() => decreaseCount(setMagic)}
        />
        <Counter
          attributeName="Cuteness"
          count={cuteness}
          increaseCount={() => increaseCount(setCuteness)}
          decreaseCount={() => decreaseCount(setCuteness)}
        />
      </form>
      <form onSubmit={handleSectionSubmit}>
      <div className="btn-container">
        <div className="d-flex justify-content-center align-items-center">
        <button className="btn custom-btn" type="submit">Submit</button>
      </div>
      </div>
      </form>
    </div>
    </div>
    </div>
  );
};

export default SheetCreator;
