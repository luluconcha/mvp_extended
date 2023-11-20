const express = require("express");
const router = express.Router();
const models = require("../models");

//get the one character



router.get("characters/:id", async(req, res) => {
    const {id} = req.params
    try {
        const character = await models.Character.findOne({
            where: {
                id
            },
        include: models.Item,
    })
    res.send(character)
    } catch (err) {
        res.status(500).send(err)
    } 
})

router.post("characters/:id/items", async (req, res) => {
    const {item} = req.body
    try {
        const character = await models.Character.findOne({
            where: {
                id
            }})
        const result = await character.addItem(item)
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    } 
})

router.delete("characters/:id", async (req, res) => {
    const {item} = req.body
    try {
        const character = await models.Character.findOne({where: {id}})
        const result = await character.removeItem(item)
        res.status(200).send(result)
    } catch (err) {
        res.status(500).send(err)
    } 
})

router.put("/characters", async(req, res) => {
    const {character} = req.body

})
module.exports = router;