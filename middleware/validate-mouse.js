module.exports = function validateMW(req, res, next) {
    let { name, connectivity, sensor, weight } = req.body;

    weight = Number(weight);

    // Validate presence of all required fields
    if (!name || !connectivity || !sensor || isNaN(weight)) {
        return res.status(400).send("All fields are required.");
    }

    // Validate field types
    if (typeof name !== 'string' || typeof connectivity !== 'string' || typeof sensor !== 'string' || typeof weight !== 'number') {
        return res.status(400).send("Invalid data types for one or more fields.");
    }

    // Validate if the weight is a non-negative Number
    if (weight <= 0) {
        return res.status(400).send("Weight must be a positive number.");
    }

    req.body.weight = weight;

    // If all validations pass
    next();
}
