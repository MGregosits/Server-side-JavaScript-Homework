const Mouse = require('../models/mouse');

module.exports = async function (req, res, next) {
    try {
        const miceCount = await Mouse.countDocuments({});
        // If there is no mice in the database
        if (miceCount === 0) {
            return res.status(400).send("At least on mouse required for the players to use.");
        }
        next();
    } catch (err) {
        console.error('Error checking mice existence:', err);
        res.status(500).send('An error occurred while checking for mice.');
    }
};