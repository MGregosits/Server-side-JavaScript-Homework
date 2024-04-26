const Mouse = require('../models/mouse');

module.exports = async function (req, res, next) {
// Getting every mouse from the database for the mouse view
    try {
        const mice = await Mouse.find();
        res.locals.mice = mice;
        next();
    } catch (err) {
        next(err);
    }
}
