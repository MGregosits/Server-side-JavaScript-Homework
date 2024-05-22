const Player = require('../models/player');

module.exports = async function (req, res, next) {
    // Creating a new document in the database
    try {
        const { name, team, mouse, dpi, sensitivity } = req.body;
        if (!name || !team || !mouse || !dpi || !sensitivity) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const existingPlayer = await Player.findOne({ name, team });
        if (existingPlayer) {
            return res.status(409).send({ message: "Player already exists" });
        }
        const newPlayer = new Player({ name, team, mouse, dpi, sensitivity });

        await newPlayer.save();
        next();
    } catch (error) {
        res.status(500).send({ message: "Failed to create player", error: error.message });
    }
}
