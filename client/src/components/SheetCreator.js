import React, { useState, useEffect } from "react";

const Counter = ({ attributeName, count, increaseCount, decreaseCount }) => (
    <div>
      <div>
        {attributeName} Count: {count}
      </div>
      <button onClick={increaseCount}>Increase</button>
      <button onClick={decreaseCount}>Decrease</button>
    </div>
  );
  

const SheetCreator = ({ onBackToHome }) => {
  // State to store input values
  const [characterName, setCharacterName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [background, setBackground] = useState("");

  // State for storing class, race, and level data
  const [classOptions, setClassOptions] = useState([]);
  const [raceOptions, setRaceOptions] = useState([]);
  const [levelOptions] = useState(Array.from({ length: 10 }, (_, index) => index + 1));
  
  // State for selected class, race, and level
  const [classId, setClassId] = useState("");
  const [raceId, setRaceId] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(1);

  // New state variables for selected class and race IDs
  const [selectedClassId, setSelectedClassId] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [selectedRaceId, setSelectedRaceId] = useState("");
  const [raceDescription, setRaceDescription] = useState("");
  

  // Counter state for attributes
  const [strength, setStrength] = useState(1);
  const [dexterity, setDexterity] = useState(1);
  const [resilience, setResilience] = useState(1);
  const [magic, setMagic] = useState(1);
  const [cuteness, setCuteness] = useState(1);

  // New state for the array of selected inventory item IDs
  const [selectedInventoryItemIds, setSelectedInventoryItemIds] = useState([]);

  // State for inventory items
  const [allInventory, setAllInventory] = useState([]);

  
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
    fetch("http://localhost:4000/class")
      .then((response) => response.json())
      .then((data) => setClassOptions(data))
      .catch((error) => console.error("Error fetching class data:", error));

    // Fetch race data
    fetch("http://localhost:4000/race")
      .then((response) => response.json())
      .then((data) => setRaceOptions(data))
      .catch((error) => console.error("Error fetching race data:", error));

    // Fetch inventory data
    fetch("http://localhost:4000/inventory")
      .then((response) => response.json())
      .then((data) => setAllInventory(data))
      .catch((error) => console.error("Error fetching inventory data:", error));
  
    }, []);


  // Handle dropdown changes
  const handleDropdownChange = (e, setter, setIdSetter, setDescriptionSetter, containerType) => {
    const selectedValue = parseInt(e.target.value, 10);

    // Check the container type and update the appropriate state
    switch (containerType) {
      case "class":
        const selectedClass = classOptions.find((classItem) => classItem.id === selectedValue);
        setter(selectedValue);
        setIdSetter(selectedValue);
        setDescriptionSetter(selectedClass ? selectedClass.DESCRIPTION : "");
        break;
      case "race":
        const selectedRace = raceOptions.find((raceItem) => raceItem.id === selectedValue);
        setter(selectedValue);
        setIdSetter(selectedValue);
        setDescriptionSetter(selectedRace ? selectedRace.DESCRIPTION : "");
        break;
      default:
        break;
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
  const handleInventoryItemSelect = (itemId) => {
    // Check if the item ID is already selected
    if (selectedInventoryItemIds.includes(itemId)) {
      // If selected, remove it from the array
      setSelectedInventoryItemIds((prevIds) => prevIds.filter((id) => id !== itemId));
    } else {
      // If not selected, add it to the array
      setSelectedInventoryItemIds((prevIds) => [...prevIds, itemId]);
    }
  };

  // Handle form submission
  const handleSectionSubmit = (e) => {
    e.preventDefault();
    // Log the stored data
    console.log("Character Name:", characterName);
    console.log("Pronouns:", pronouns);
    console.log("Background:", background);
    console.log("Selected Class ID:", selectedClassId);
    console.log("Selected Race ID:", selectedRaceId);
    console.log("Selected Level:", selectedLevel);
    console.log("Strength:", strength);
    console.log("Dexterity:", dexterity);
    console.log("Resilience:", resilience);
    console.log("Magic:", magic);
    console.log("Cuteness:", cuteness);
    console.log("Selected Inventory Item IDs:", selectedInventoryItemIds);

  };

  
  return (
    <div>
      <button onClick={onBackToHome}>Back to Home Page</button>
      <form onSubmit={handleSubmit}>
        <label>
          Character Name:
          <input
            type="text"
            name="characterName"
            value={characterName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Pronouns:
          <input
            type="text"
            name="pronouns"
            value={pronouns}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Background:
          <textarea
            name="background"
            value={background}
            onChange={handleInputChange}
          />
        </label>
        {/* Dropdown for class selection */}
        <label>
        Class:
          <select
            value={classId}
            onChange={(e) => handleDropdownChange(e, setClassId, setSelectedClassId, setClassDescription, "class")}
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
        <br />

        {/* Dropdown for race selection */}
        <label>
          Race:
          <select
            value={raceId}
            onChange={(e) => handleDropdownChange(e, setRaceId, setSelectedRaceId, setRaceDescription, "race")}
          >
            <option value="">Select Race</option>
            {raceOptions.map((raceItem) => (
              <option key={raceItem.id} value={raceItem.id}>
                {raceItem.NAME}
              </option>
            ))}
          </select>
          <div>
            <h3>Selected Race Description</h3>
            <p>{raceDescription}</p>
          </div>
        </label>
        <br />

        {/* Dropdown for level selection */}
        <label>
          Level:
          <select
            value={selectedLevel}
            onChange={(e) => handleDropdownChange(e, setSelectedLevel, () => {})}
            >
            {levelOptions.map((level) => (
            <option key={level} value={level}>
                {level}
            </option>
            ))}
          </select>
        </label>
        <br />

        <div>
        <h3>All Inventory Items</h3>
        {allInventory.map((item) => (
            <div key={item.id}>
            <label>
                <input
                type="checkbox"
                checked={selectedInventoryItemIds.includes(item.id)}
                onChange={() => handleInventoryItemSelect(item.id)}
                />
                {item.NAME} - Type: {item.TYPE} - Description: {item.DESCRIPTION}
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
      <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default SheetCreator;
