const express = require('express');
const bodyParser = require('body-parser');
//const path = require('path');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('resources'));

global.__basedir = __dirname

// Configuring the database
const dbConfig = require('./app/config/db.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./app/routes/demoRoute.js')(app)

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});