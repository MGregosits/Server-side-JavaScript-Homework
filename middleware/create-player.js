const Player = require('../models/player');

module.exports = async function (req, res, next) {
    // Creating a new document in the database
    try {
        const { name, team, mouse, dpi, sensitivity } = req.body;
        const newMouse = new Player({ name, team, mouse, dpi, sensitivity });

        await newMouse.save();
        next();
    } catch (error) {
        res.status(500).send({ message: "Failed to create mouse", error: error.message });
    }
}
