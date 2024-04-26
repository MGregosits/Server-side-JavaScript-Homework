const Mouse = require('../models/mouse');

// Middleware to fetch a mouse by ID
module.exports = async function (req, res, next) {
    const mouseId = req.params.id;
    try {
        const mouse = await Mouse.findById(mouseId);
        if (!mouse) {
            return res.status(404).send('Mouse not found.');
        }
        res.locals.mouse = mouse;
        next();
    } catch (err) {
        console.error('Error fetching mouse:', err);
        return res.status(500).send('An error occurred while fetching the mouse.');
    }
}
