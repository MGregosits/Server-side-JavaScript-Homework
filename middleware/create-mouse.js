const Mouse = require('../models/mouse');
const Player = require("../models/player");

module.exports = async function (req, res, next) {
    // Creating a new document in the database
    try {
        const { name, connectivity, sensor, weight } = req.body;
        const existingMouse = await Mouse.findOne({ name, sensor });
        if (existingMouse) {
            return res.status(409).send({ message: "Mouse already exists" });
        }
        const newMouse = new Mouse({ name, connectivity, sensor, weight });

        await newMouse.save();
        next();
    } catch (error) {
        res.status(500).send({ message: "Failed to create mouse", error: error.message });
    }
}
