var express = require('express');
var router = express.Router();
const db = require("../model/helper");

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM TYPE';
    
    const result = await db(query);

    res.json(result.data);
  } catch (error) {
    console.error('Error fetching Type:', error);
    res.status(500).json({ error: 'Failed to fetch Type.' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const typeId = req.params.id;

    const query = `SELECT * FROM TYPE WHERE id = ${typeId}`;

    const result = await db(query);

    if (result.data.length === 0) {
      res.status(404).json({ error: "Type id not found" });
    } else {
      res.status(200).json(result.data[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
