const express = require('express');
const router = express.Router();
const path = require('path');

const getMW = require('../middleware/get-player');
const getPlayerMW = require('../middleware/get-player-by-id');
const getMiceMW = require('../middleware/get-mouse');
const createMW = require('../middleware/create-player');
const updateMW = require('../middleware/update-player');
const deleteMW = require('../middleware/delete-player');
const validateMW = require('../middleware/validate-player');
const validateMouseExistenceMW = require('../middleware/validate-mouse-existence');


router.get('/', getMW, function(req, res) {
    res.render('../views/index.ejs', {players: res.locals.players});
});

router.get('/create', validateMouseExistenceMW, getMiceMW, function(req, res) {
    res.render('../views/create-player.ejs', {mice: res.locals.mice});
});

router.post('/create', validateMW, createMW, function(req, res) {
    console.log('Received POST request for creating player');
    console.log(req.body);
    res.redirect('/');
});

router.get('/update/:id', getPlayerMW, getMiceMW, function(req, res) {
    res.render('../views/update-player.ejs', {player: res.locals.player, mice: res.locals.mice});
});

router.post('/update/:id', validateMW, updateMW, function(req, res) {
    console.log('Received POST request for updating player');
    console.log(req.body);
    res.redirect('/');
});

router.post('/delete/:id', deleteMW, function (req, res) {
    console.log(`Received POST request for deleting player with id ${req.params.id}`);
    res.redirect('/')
});

module.exports = router;