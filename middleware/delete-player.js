const Player = require('../models/player');

module.exports = async function (req, res, next) {
    // deleting player document from the database
    const playerId = req.params.id;
    try {
        await Player.findByIdAndDelete(playerId);
        next();
    } catch (err) {
        console.error('Error deleting player:', err);
        return res.status(500).send('An error occurred while deleting the player.');
    }
}
