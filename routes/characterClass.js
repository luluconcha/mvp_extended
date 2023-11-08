var express = require('express');
var router = express.Router();
const db = require("../model/helper");


router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM CLASS';
    
    const result = await db(query);

    res.json(result.data);
  } catch (error) {
    console.error('Error fetching Class:', error);
    res.status(500).json({ error: 'Failed to fetch Class.' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const classId = req.params.id;

    const query = `SELECT * FROM CLASS WHERE id = ${classId}`;

    const result = await db(query);

    if (result.data.length === 0) {
      res.status(404).json({ error: "Class id not found" });
    } else {
      res.status(200).json(result.data[0]);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
