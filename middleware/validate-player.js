module.exports = function validateMW(req, res, next) {
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

    // Validate if the weight is a non-negative Number
    if (dpi <= 0) {
        return res.status(400).send("DPI must be a positive number.");
    }

    // Validate if the weight is a non-negative Number
    if (sensitivity <= 0) {
        return res.status(400).send("Sensitivity must be a positive number.");
    }

    req.body.dpi = dpi;
    req.body.sensitivity = sensitivity;


    // If all validations pass
    next();
}
