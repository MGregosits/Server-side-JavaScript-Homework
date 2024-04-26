const express = require('express');
const router = express.Router();
const path = require('path');

const getMW = require('../middleware/get-mouse')
const getMouseMW = require('../middleware/get-mouse-by-id')
const createMW = require('../middleware/create-mouse');
const updateMW = require('../middleware/update-mouse');
const deleteMW = require('../middleware/delete-mouse');
const validateMW = require('../middleware/validate-mouse')

router.get('/', getMW, function(req, res) {
    res.render('../views/mouse.ejs', { mice: res.locals.mice});
});

router.get('/create', function(req, res) {
    res.render('../views/create-mouse.ejs');
});

router.post('/create', validateMW, createMW, function(req, res) {
    console.log('Received POST request for creating mouse');
    console.log(req.body);
    res.redirect('/mouse')
});

router.get('/update/:id', getMouseMW, function(req, res) {
    res.render('../views/update-mouse.ejs', {mouse: res.locals.mouse});
});

router.post('/update/:id', validateMW, updateMW, function(req, res) {
    console.log('Received POST request for updating mouse');
    console.log(req.body);
    res.redirect('/mouse')
});

router.post('/delete/:id', deleteMW, function (req, res) {
    console.log(`Mouse with id ${req.params.id} has been deleted.`);
    res.redirect('/mouse')
});

module.exports = router;