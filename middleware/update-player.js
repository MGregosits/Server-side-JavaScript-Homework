const Player = require('../models/player');

module.exports = async function (req, res, next) {
    // updating player document in the database
    const playerId = req.params.id;
    const updateData = req.body; // This should contain the update fields and values
    try {
        const updatedPlayer = await Player.findByIdAndUpdate(playerId, updateData, { new: true });
        if (!updatedPlayer) {
            return res.status(404).send('Player not found.');
        }
        req.updatedPlayer = updatedPlayer;
        next();
    } catch (err) {
        console.error('Error updating player:', err);
        return res.status(500).send('An error occurred while updating the player.');
    }
}
