const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const mouseRoutes = require('./routes/mouse');

// Middleware to serve static files
// This middleware serves static files from the 'public' directory
app.use('/', express.static(path.join(__dirname, 'public')));

// Middleware to parse the request body
// This middleware parses the body of incoming HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/player', playerRoutes);
app.use('/mouse', mouseRoutes);


app.listen(port, () => {console.log(`Express app is running on port ${port}`)} );