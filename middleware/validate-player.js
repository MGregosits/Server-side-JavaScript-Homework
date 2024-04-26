Mouse = require('../models/mouse');

module.exports = async function validateMW(req, res, next) {
    let { name, team, mouse, dpi, sensitivity } = req.body;

    dpi = Number(dpi);
    sensitivity = Number(sensitivity);

    // Validate presence of all required fields
    if (!name || !team || !mouse || isNaN(dpi) || isNaN(sensitivity)) {
        return res.status(400).send("All fields are required.");
    }

    // Validate field types
    if (typeof name !== 'string' || typeof team !== 'string' || typeof mouse !== 'string' || typeof dpi !== 'number' || typeof sensitivity !== 'number') {
        return res.status(400).send("Invalid data types for one or more fields.");
    }

    // Validate if the dpi is in an acceptable range
    if (dpi < 100 || dpi > 16000) {
        return res.status(400).send("DPI must be between 100 and 16000.");
    }

    // Validate if the sensitivity is in an acceptable range
    if (sensitivity <= 0 || sensitivity > 10) {
        return res.status(400).send("Sensitivity must be a positive number and reasonable.");
    }

    try {
        // Look up the mouse ObjectId by name
        const mouseDoc = await Mouse.findOne({ name: mouse });
        if (!mouseDoc) {
            return res.status(400).send("Mouse not found.");
        }

        // Replace the mouse name with its ObjectId
        req.body.mouse = mouseDoc._id;

        // Continue with the middleware chain
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send("An error occurred while processing your request.");
    }
};
