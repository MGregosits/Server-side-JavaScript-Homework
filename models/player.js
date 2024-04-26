const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    mouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Mouse', required: true },
    dpi: { type: Number, required: true },
    sensitivity: { type: Number, required: true }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
