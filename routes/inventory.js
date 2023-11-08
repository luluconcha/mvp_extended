var express = require('express');
var router = express.Router();
const db = require("../model/helper");


router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM INVENTORY';
    
    const result = await db(query);

    res.json(result.data);
  } catch (error) {
    console.error('Error fetching Inventory:', error);
    res.status(500).json({ error: 'Failed to fetch Inventory.' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const inventoryId = req.params.id;

    const query = `SELECT * FROM CLASS WHERE id = ${inventoryId}`;

    const result = await db(query);

    if (result.data.length === 0) {
      res.status(404).json({ error: "Inventory item not found" });
    } else {
      res.status(200).json(result.data[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
