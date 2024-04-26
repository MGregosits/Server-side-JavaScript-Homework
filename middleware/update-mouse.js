const Mouse = require('../models/mouse');

module.exports = async function (req, res, next) {
    // updating mouse document in the database
    const mouseId = req.params.id;
    const updateData = req.body; // This should contain the update fields and values
    try {
        const updatedMouse = await Mouse.findByIdAndUpdate(mouseId, updateData, { new: true });
        if (!updatedMouse) {
            return res.status(404).send('Mouse not found.');
        }
        req.updatedMouse = updatedMouse;
        next();
    } catch (err) {
        console.error('Error updating mouse:', err);
        return res.status(500).send('An error occurred while updating the mouse.');
    }
}
