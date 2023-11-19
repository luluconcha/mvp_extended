const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/items", async(req, res) => {
    try {

    } catch (err) {
        res.status(500).send(error)
    } 
})

module.exports = router;