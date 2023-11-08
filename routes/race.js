var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM RACE';
    
    const result = await db(query);

    res.json(result.data);
  } catch (error) {
    console.error('Error fetching Race:', error);
    res.status(500).json({ error: 'Failed to fetch Race.' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const raceId = req.params.id;

    const query = `SELECT * FROM RACE WHERE id = ${raceId}`;

    const result = await db(query);

    if (result.data.length === 0) {
      res.status(404).json({ error: "Race id not found" });
    } else {
      res.status(200).json(result.data[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
