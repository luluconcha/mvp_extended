var express = require('express');
var router = express.Router();
const db = require("../model/helper");


router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM INVENTORY_LIST';
    
    const result = await db(query);

    res.json(result.data);
  } catch (error) {
    console.error('Error fetching Inventory List:', error);
    res.status(500).json({ error: 'Failed to fetch Inventory List.' });
  }
});

// router.get("/:id", async (req, res) => {
//   try {
//     const inventoryListId = req.params.id;

//     const query = `SELECT * FROM INVENTORY_LIST WHERE id = ${inventoryListId}`;

//     const result = await db(query);

//     if (result.data.length === 0) {
//       res.status(404).json({ error: "Inventory List id not found" });
//     } else {
//       res.status(200).json(result.data[0]);
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const inventoryListId = req.params.id;

    const query = `SELECT * FROM INVENTORY_LIST WHERE CHARACTER_ID = ${inventoryListId}`;

    const result = await db(query);

    if (result.data.length === 0) {
      res.status(404).json({ error: "Inventory List id not found" });
    } else {
      res.status(200).json(result.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {

    const { item_id, character_id } = req.body;

    await db(
      `INSERT INTO INVENTORY_LIST (ITEM_ID, CHARACTER_ID) VALUES (${item_id}, ${character_id});`
    );
//insert check notes
    res.status(201).json({ message: 'Item added successfully' });
  } catch (error) {
    console.error('Error adding the item to the inventory:', error);
    res.status(500).json({ error: 'Error adding the item to the inventory.' });
  }
});

// INSERT INTO INVENTORY_LIST (INVENTORY_ID, CHARACTER_ID) VALUES (item_id, character_id);

module.exports = router;
