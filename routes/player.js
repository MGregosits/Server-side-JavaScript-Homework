const express = require('express');
const router = express.Router();
const path = require('path');

const getMW = require('../middleware/get-player')
const createMW = require('../middleware/create-player');
const updateMW = require('../middleware/update-player');
const deleteMW = require('../middleware/delete-player');
const validateMW = require('../middleware/validate-player')


router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/create', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/create-player.html'));
});

router.post('/create', validateMW, createMW, function(req, res) {
    console.log('Received POST request for creating player');
    console.log(req.body);
    res.redirect('/');
});

router.get('/update', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/update-player.html'));
});

router.post('/update', validateMW, updateMW, function(req, res) {
    console.log('Received POST request for updating player');
    console.log(req.body);
    res.redirect('/');
});

router.post('/delete/:id', deleteMW, function (req, res) {
    console.log(`Received POST request for deleting player with id ${req.params.id}`);
    res.redirect('/')
});

module.exports = router;