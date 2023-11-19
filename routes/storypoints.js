const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/storypoints", async(req, res) => {
    try {
       const storypoints = await models.Storypoint.findAll()
       res.status(200).send(storypoints)
    } catch (err) {
        res.status(500).send(err)
    } 
})

router.post("/storypoints", async (req, res) => {
    const {title, content, parent} = req.body
    try {
        const newStorypoint = await models.Storypoint.create({
            title: title, content: content, flagged: false, parentID: parent.id
        }, {
            fields: ["title", "content", "ParentID"]
        })
        res.status(200).send(newStorypoint)
    } catch (err) {
        res.send(err)
    }
})

router.delete("/storypoints", async (req, res) =>{
    
})
module.exports = router;