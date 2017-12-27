var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// function getDecimalNumber(val) { return (val/1000000).toFixed(2); }
// function setDecimalNumber(val) { return (val*1000000).toFixed(2); }
// Rate:           {type: Number, default: 0, get: getDecimalNumber, set: setDecimalNumber},

var item_schema = new Schema({
    Name:           {type: String, required: true, default:''},
    Quantity:       {type: Number,  required: true, default:0},
    Rate:           {type: Number, default: 0},
});

// var CounterSchema = Schema({
//     _id: {type: String, required: true},
//     seq: { type: Number, default: 0 }
// });
// var counter = mongoose.model('counter', CounterSchema);

var bill_schema = new Schema({
    BillNumber:     {type: Number, required: true, default:0},
    Discount:       {type: Number,  required: true, default:0},
    Tax:            {type: Number,  required: true, default:0},
    Items:          [item_schema],
    BillDate:       {type: Date, required:true},
    CustomerId:     Schema.Types.ObjectId
});

// bill_schema.pre('save', function(next) {
//     var doc = this;
//     counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.BillNumber = counter.seq;
//         next();
//     });
// });
module.exports = mongoose.model('BillItem',bill_schema);


