const express = require("express");
const router = express.Router();
const models = require("../models");


router.get("/", async(req, res) => {
    try {
       const storypoints = await models.StoryPoint.findAll()
       res.status(200).send(storypoints)
    } catch (err) {
        res.status(500).send(err)
    } 
})

router.get("/:id", async(req, res) => {
    const {id} = req.params
    try {
        const storypoint = await models.StoryPoint.findOne({
            where: {
                id
            },
  
    })
    res.send(storypoint)
    } catch (err) {
        res.status(500).send(err)
    } 
})

router.post("/", async (req, res) => {
    const {title, content, parent} = req.body
    try {
        const newStorypoint = await models.StoryPoint.create({
            title: title,
            content: content,
            flagged: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            parentID: parent.id
        }, {
            fields: ["title", "content", "flagged", "createdAt", "updatedAt", "ParentID"]
        })
        res.status(200).send(newStorypoint)
    } catch (err) {
        res.send(err)
    }
})


module.exports = router;