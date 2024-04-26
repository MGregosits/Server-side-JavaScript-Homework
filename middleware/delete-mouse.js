const Mouse = require('../models/mouse');

module.exports = async function (req, res, next) {
    // deleting mouse document from the database
    const mouseId = req.params.id;
    try {
        await Mouse.findByIdAndDelete(mouseId);
        next();
    } catch (err) {
        console.error('Error deleting mouse:', err);
        return res.status(500).send('An error occurred while deleting the mouse.');
    }
}
