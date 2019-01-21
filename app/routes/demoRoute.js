/*module.exports = function(app) {
    const demo = require('../controllers/demoController.js');

    
    // Create a new data
    app.route('/create').post(demo.create);

    // Retrieve all data
    app.get('/findAll', demo.findAll);

    // Retrieve a single data with Id
    app.get('/find/:Id', demo.findOne);

    // Update data with id
    app.put('/update/:Id', demo.update);

    // Delete data with id
    app.delete('/delete/:Id', demo.delete);
}
*/
module.exports = function(app) {
 
	var express = require("express");
	var router = express.Router();
	
    const users = require('../controllers/demoController.js');
	
	var path = __basedir + '/views/';
	
	router.use(function (req,res,next) {
		console.log("/" + req.method);
		next();
	});
	
	app.get('/', (req,res) => {
		res.sendFile(path + "index.html");
	});
 
    // Save a User to MongoDB
    app.post('/create', users.create);
 
    // Retrieve all Users
    app.get('/findAll', users.findAll);
    
    // Retrieve a single data with Id
    app.get('/find/:FirstName', users.findOne);

    // Delete data with id
    app.delete('/delete/:Id', users.delete);
    
    // Update data with id
    app.put('/update/:Id', users.update);


	app.use("/",router);
 
	app.use("*", (req,res) => {
		res.sendFile(path + "404.html");
	});
}