const express = require('express');
const router = express.Router();
const path = require('path');

const createMW = require('../middleware/create-mouse');
const updateMW = require('../middleware/update-mouse');
const deleteMW = require('../middleware/delete-mouse');
const validateMW = require('../middleware/validate-mouse')

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/mouse.html'));
});

router.get('/create', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/create-mouse.html'));
});

router.post('/create', validateMW, createMW, function(req, res) {
    console.log('Received POST request for creating mouse');
    console.log(req.body);
    res.redirect('/mouse')
});

router.get('/update', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/update-mouse.html'));
});

router.post('/update', validateMW, updateMW, function(req, res) {
    console.log('Received POST request for updating mouse');
    console.log(req.body);
    res.redirect('/mouse')
});

router.post('/delete/:id', deleteMW, function (req, res) {
    console.log(`Received POST request for deleting mouse with id ${req.params.id}`);
    res.redirect('/mouse')
});

module.exports = router;