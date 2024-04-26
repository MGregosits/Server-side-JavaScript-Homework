const Player = require('../models/player');

// Middleware to fetch a player by ID
module.exports = async function (req, res, next) {
    const playerId = req.params.id;
    try {
        const player = await Player.findById(playerId);
        if (!player) {
            return res.status(404).send('Player not found.');
        }
        res.locals.player = player;
        next();
    } catch (err) {
        console.error('Error fetching player:', err);
        return res.status(500).send('An error occurred while fetching the player.');
    }
}
