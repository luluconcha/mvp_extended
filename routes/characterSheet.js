var express = require('express');
var router = express.Router();
const db = require("../model/helper");


router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM CHARACTER_SHEET';
    
    const result = await db(query);

    res.json(result.data);
  } catch (error) {
    console.error('Error fetching Character Sheet:', error);
    res.status(500).json({ error: 'Failed to fetch Character Sheet.' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const characterId = req.params.id;

    const query = `SELECT * FROM CHARACTER_SHEET WHERE id = ${characterId}`;

    const result = await db(query);

    if (result.data.length === 0) {
      res.status(404).json({ error: "Character id not found" });
    } else {
      res.status(200).json(result.data[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {

    const { CHARACTER_NAME, PRONOUNS, BACKGROUND, LEVEL, CLASS, RACE, 
      STRENGTH, DEXTERITY, RESILIENCE, MAGIC, CUTENESS, inventoryItems } = req.body;

    await db(
      `INSERT INTO CHARACTER_SHEET (CHARACTER_NAME, PRONOUNS, BACKGROUND, LEVEL, CLASS, RACE, 
        STRENGTH, DEXTERITY, RESILIENCE, MAGIC, CUTENESS) 
        VALUES ('${CHARACTER_NAME}', '${PRONOUNS}', '${BACKGROUND}', ${LEVEL}, ${CLASS}, ${RACE}, 
        ${STRENGTH}, ${DEXTERITY}, ${RESILIENCE}, ${MAGIC}, ${CUTENESS});`
    );

    const newCharacterQuery = 'SELECT * FROM CHARACTER_SHEET ORDER BY id DESC LIMIT 1';
    const characterResult = await db(newCharacterQuery);
    
    const characterId = characterResult.data[0].id;

    if (inventoryItems && inventoryItems.length > 0) {
      for (const item of inventoryItems) {
        await db(
          `INSERT INTO INVENTORY_LIST (ITEM_ID, CHARACTER_ID) VALUES (${item}, ${characterId});`
        );
      }
    }

    const inventoryQuery = `SELECT * FROM INVENTORY_LIST WHERE CHARACTER_ID = ${characterId}`;
    const inventoryResult = await db(inventoryQuery);

    res.status(201).json({
      message: 'Character and items added successfully',
      character: characterResult.data[0],
      inventoryItems: inventoryResult.data,
    });
  } catch (error) {
    console.error('Error creating character sheet:', error);
    res.status(500).json({ error: 'Failed to create character sheet.' });
  }
});

router.put('/:id', async (req, res) => {
  try {

    const characterId = req.params.id;
    
    const { CHARACTER_NAME, PRONOUNS, BACKGROUND, LEVEL, CLASS, RACE, 
      STRENGTH, DEXTERITY, RESILIENCE, MAGIC, CUTENESS } = req.body;

    await db(
      `UPDATE CHARACTER_SHEET
      SET CHARACTER_NAME = '${CHARACTER_NAME}',
      PRONOUNS = '${PRONOUNS}',
      BACKGROUND = '${BACKGROUND}',
      LEVEL = ${LEVEL},
      CLASS = ${CLASS},
      RACE = ${RACE},
      STRENGTH = ${STRENGTH},
      DEXTERITY = ${DEXTERITY},
      RESILIENCE = ${RESILIENCE},
      MAGIC = ${MAGIC},
      CUTENESS = ${CUTENESS}
      WHERE id = ${characterId};`
    );

    const updatedCharacterQuery = `SELECT * FROM CHARACTER_SHEET WHERE id = ${characterId}`;
    const result = await db(updatedCharacterQuery);

    res.json(result.data[0]);
  } catch (error) {
    console.error('Error updating character sheet:', error);
    res.status(500).json({ error: 'Failed to update character sheet.' });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const characterId = req.params.id; // Get the iD from the URL

    // Use todoId to uniquely identify and delete the specific todo item

    const query = `DELETE FROM CHARACTER_SHEET WHERE id = ${characterId}`;

    await db(query);

    const results = await db("SELECT * FROM CHARACTER_SHEET");
    res.status(200).json(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
