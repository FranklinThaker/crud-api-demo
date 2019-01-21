const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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

//const demo = require('./app/controllers/demoController.js');
//var User = require('./app/models/demoModel.js');

//     // Create a new data
    
//     app.post("/create", (req, res) => {
//         // Create a data
//     const demo = new User({
//         fname: req.body.fname || "Untitled", 
//         lname: req.body.lname || "Untitled2"

//     // Save data in the database
//     demo.save()
//     .then(data => {
//         res.send(data);
//         console.log('saved');
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while creating the data."
//         });
//     });

//     });

// let routes = require('./app/routes/demoRoute.js')
// routes(app);
;

require('./app/routes/demoRoute.js')(app)

//app.use('/', routes);

// Retrieve all data
//app.get('/findAll', demo.findAll);


// define a simple route
//  app.get('/', (req, res) => {
//      //res.json({"message": "Welcome to Franklin Thaker application. !! ^_^ "});
//      res.sendFile(__dirname + "/views/index.html");
//  });

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});