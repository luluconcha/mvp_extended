const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/creatures", async(req, res) => {
    const where = req.query;
    try {
       const allCreatures = models.Users.findAll({
            where,
            attributes: ["name"],
          })
    res.status(200).send(allCreatures)
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;