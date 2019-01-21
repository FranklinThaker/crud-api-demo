
const demoModel = require('../models/demoModel.js');



// Create and Save a new data
exports.create = (req, res) => {
    // Validate request
    if(!req.body.firstname) {
        return res.status(400).send({
            message: "Data content can not be empty"
        });
    }

    // Create a data
    const demo = new demoModel({
        fname: req.body.firstname || "Untitled", 
        lname: req.body.lastname
    });

    // Save data in the database
    demo.save()
    .then(data => {
        res.send(data);
        console.log('saved');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the data."
        });
    });
};

// Retrieve and return all data from the database.
exports.findAll = (req, res) => {
    demoModel.find()
    .then(demo => {
        res.send(demo);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving data."
        });
    });
};

// Find a single data with a id
exports.findOne = (req, res) => {
    demoModel.findById(req.params.Id)
    .then(demo => {
        if(!demo) {
            return res.status(404).send({
                message: "Data not found with id " + req.params.Id
            });            
        }
        res.send(demo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "data not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving data with id " + req.params.Id
        });
    });
};

// Update a data identified by the Id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.fname) {
        return res.status(400).send({
            message: "data content can not be empty"
        });
    }

    // Find data and update it with the request body
    demoModel.findByIdAndUpdate(req.params.Id, {
        fname: req.body.fname || "Untitled Update",
        lname: req.body.lname
    }, {new: true})
    .then(demo => {
        if(!demo) {
            return res.status(404).send({
                message: "data not found with id " + req.params.Id
            });
        }
        res.send(demo);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "data not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Error updating data with id " + req.params.Id
        });
    });
};

// Delete a data with the specified Id in the request
exports.delete = (req, res) => {
    demoModel.findByIdAndRemove(req.params.Id)
    .then(demo => {
        if(!demo) {
            return res.status(404).send({
                message: "data not found with id " + req.params.Id
            });
        }
        res.send({message: "data deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "data not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete data with id " + req.params.Id
        });
    });
};


