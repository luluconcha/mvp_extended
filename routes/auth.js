var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var db = require("../model/helper");
require("dotenv").config();
var bcrypt = require("bcrypt");
const saltRounds = 10;
const models = require("../models");

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = await models.User.create({username: username, password: hash})
    res.status(200).send({ message: `${username} was created!` });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const results = await models.User.findOne({
      where: {
        username
      }
    })
 
    const user = results.dataValues;

    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      var token = jwt.sign({ user_id }, supersecret);
      res.send({ message: "Login successful" })
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.get("/profile", (req, res) => {
  res.send({
    message: "Here is the PROTECTED data for user " + req.user_id,
  });
});

module.exports = router;
