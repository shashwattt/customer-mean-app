var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var address_schema = new Schema({
    _id:        Schema.Types.ObjectId,
    Flat:       {type: String, default:''},
    Street:     {type: String, default:''},
    State:      {type: String, default:''},
    Pincode:    {type: String, default:''},
})
var customer_schema = new Schema({
    _id:        Schema.Types.ObjectId,
    Name:       {type: String, required: true, default:''},
    Mobile:     {type: String,  required: true, default:''},
    Phone:      {type: String,  required: true, default:''},
    Addresses:  [address_schema],
    DOB:        {type: Date, required:true, default:''},
    Email:      {type: String, unique:true,required:true}
});

module.exports = mongoose.model('CustomerItem',customer_schema); 