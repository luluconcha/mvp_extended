const express = require("express");
const router = express.Router();
const models = require("../models");


router.get("/users", async (req, res) => {
    const where = req.query;
    try {
       const allUserData = models.Users.findAll({
            where,
            attributes: ["username"],
            // include all nested relationships
            // include: { all: true, nested: true },
            include: {
              model: models.Character,
              attributes: ["name", "pronouns", "energyLevel", "creatureID"],
              include: {
                model: models.Item,
                attributes: ["item"],
              },
            },
          })
    res.status(200).send(allUserData)
    } catch (err) {
        res.status(400).send(err)
    }
})


router.get("/:id", async(req, res) => {
    try {
        const user = await models.User.findByPK(`${req.params.id}`)
        if (!user) res.send({message: "user not found"})
        res.send(user)
    } catch (err) {
        res.status(500).send(err)
    } 
})

// get all a user's characters
router.get("/:id/characters", async(req, res) => {
    try {
        const user = await models.User.findByPK(`${req.params.id}`)
        if (!user) res.send({message: "user not found"})
        const characters = await user.getCharacters();
        if (!characters) res.send({message: "no characters found for this user"})
        res.send(characters);
    } catch (err) {
        res.status(500).send(err)
    } 
})

// create a character
router.post("/:id/characters", async(req, res) => {
   const {character} = req.body
    try {
        const user = await models.User.findByPK(`${req.params.id}`)
        if (!user) res.send({message: "user not found"})
        const newCharacter = await user.createCharacter({character})
        res.status(200).send({message: "character was created successfully!", created: newCharacter})
    } catch(err) {
        res.status(404).send(err)
    }
})



module.exports = router;