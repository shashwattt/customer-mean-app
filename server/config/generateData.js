
var Customer = require('../models/CustomerItem');
var Bill = require('../models/BillItem');

exports.addData = function() {
    console.log('Auto Bill Generation')
    let cusIds = [];
    Customer.find({}).exec(function(error,customers) {
        console.log('There are customers = ',customers.length)
        if(customers && customers.length>0){
            customers.forEach(item =>{
                cusIds.push(item._id);
            })
        }
    });
    Bill.find({}).exec(function(error,bills) {
        console.log('bills.length' ,bills.length)
        if(bills.length === 0) {
            let billsArray = [];
           for(x=1; x<=1000; x++){
                
                let billItem = new Bill();
                billItem.BillNumber = x;
                billItem.Discount = ((Math.random()*10)+1).toFixed(0);
                billItem.Tax = ((Math.random()*10)+1).toFixed(2);
                billItem.BillDate = new Date(0);
                billItem.CustomerId = cusIds[x%cusIds.length];
                let itemsArray = [];
                for(y=0; y<x%3+1; y++){
                    let item = new Object();
                    item.Name = 'Item Name '+ y;
                    item.Quantity = ((Math.random()*10)+1).toFixed(0);
                    item.Rate = ((Math.random()*100)+1).toFixed(2);
                    itemsArray.push(item);
                }
                billItem.Items = itemsArray;
                billsArray.push(billItem);
           }

           Bill.create(billsArray, function(err, resp){
               if(err){
                   console.log('failed- ',err)
               }else{
                   console.log('success- ', resp)
               }

           })
        }
    })
}
