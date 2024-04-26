const mongoose = require('mongoose');

const mouseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    connectivity: { type: String, required: true},
    sensor: { type: String, required: true },
    weight: { type: Number, required: true }
});

const Mouse = mongoose.model('Mouse', mouseSchema);

module.exports = Mouse;
