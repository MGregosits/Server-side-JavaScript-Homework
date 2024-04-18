const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser');
const playerRoutes = require('./routes/player');
const mouseRoutes = require('./routes/mouse');

// Middleware to parse the request body
// This middleware parses the body of incoming HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));

// Route handler for the root path (/) to redirect to /player
app.get('/', (req, res) => {
    res.redirect('/player');
});

// Middleware to serve static files
// This middleware serves static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mounting handlers
app.use('/player', playerRoutes);
app.use('/mouse', mouseRoutes);

// Starting the server
app.listen(port, () => {console.log(`Express app is running on port ${port}`)} );