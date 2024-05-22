const Mouse = require('../models/mouse');
const Player = require('../models/player');

module.exports = async function (req, res, next) {
    // deleting mouse document from the database
    const mouseId = req.params.id;
    try {
        // Check if any players are using this mouse
        const playersUsingMouse = await Player.find({ mouse: mouseId });
        if (playersUsingMouse.length > 0) {
            // If players are found using the mouse, do not delete. Send a response instead.
            return res.status(400).send('Cannot delete mouse because it is currently being used by players.');
        }
        // If no players are using the mouse, proceed with deletion
        await Mouse.findByIdAndDelete(mouseId);
        next();
    } catch (err) {
        console.error('Error deleting mouse:', err);
        return res.status(500).send('An error occurred while deleting the mouse.');
    }
}
