const mongoose = require('mongoose');

const DemoSchema = mongoose.Schema(
{
    fname: String, 
    lname: String, 
}, 

{
    timestamps: true
}
);

module.exports = mongoose.model('DEMOAPP', DemoSchema);