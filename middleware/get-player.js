const Player = require('../models/player');

module.exports = async function (req, res, next) {
// Getting every player from the database for the player view
    try {
        const players = await Player.find();
        res.locals.players = players;
        next();
    } catch (err) {
        next(err);
    }
}
