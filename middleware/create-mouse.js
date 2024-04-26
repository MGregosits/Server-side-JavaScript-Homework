const Player = require('../models/mouse');

module.exports = async function (req, res, next) {
    // Creating a new document in the database
    try {
        const { name, team, mouse, dpi, sensitivity } = req.body;
        const newPlayer = new Player({ name, team, mouse, dpi, sensitivity });

        await newPlayer.save();
        next();
    } catch (error) {
        res.status(500).send({ message: "Failed to create player", error: error.message });
    }
}
