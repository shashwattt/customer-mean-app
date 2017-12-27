const express = require('express');
const router = express.Router();
const CustomerItem = require('../models/CustomerItem');
const BillItem = require('../models/BillItem');

router.get('/', (req, res, next) => {
    CustomerItem.find()
    .exec(function(err, resp){
        if(err){
            return res.status(500).json({
              status: 'failed',
              error: error
            });
        }
        res.status(200).json({
          status: 'success',
          obj: resp
        });
    });
});

router.get('/report', (req, res, next) => {
    console.log("In report")
    var hundred = 100;
    var doubleHunderd = 10000;
    BillItem.aggregate([
        {
          $unwind: "$Items"
        }, 
        {
          $group: {
            _id: '$CustomerId',
            amount: {
              $sum: {
                $subtract: [{
                    $add: [{ //Sum
                        $multiply: ["$Items.Rate", "$Items.Quantity"]
                      },
                      { //TAX
                        $divide: [{
                          $multiply: ["$Items.Rate", "$Items.Quantity", "$Discount", "$Tax"]
                        }, doubleHunderd]
                      }
                    ]
                  },
                  { //DISCOUNT
                    $divide: [{
                      $multiply: ["$Items.Rate", "$Items.Quantity", "$Discount"]
                    }, hundred]
                  }
                ]
              }
            },

            billCount: {
              $sum: 1
            },

            distinctIds : {$addToSet : "$_id"}
          }
        }

    ], function (err, resp) {
        if(err){
            return res.status(500).json({
              status: 'failed',
              error: error
            });
        }
        res.status(200).json({
          status: 'success',
          obj: resp
        });
    });
});


router.post('/add', (req, res, next) => {
    let data = req.body;
    console.log(data);
    
    if(data._id != ''){
        let AddressList = [];
        if(data.address && data.address.length>0){
            data.address.forEach(element => {
                let add = new Object();
                add.Flat = element.flat;
                add.Street = element.street;
                add.State = element.state;
                add.Pincode = element.pincode;
                add._id = element._id
                console.log(add)
                AddressList.push(add);
            });
           
        }
        var newCustomer = new CustomerItem({
            _id:        data._id,
            Name:       data.fullName,
            Mobile:     data.mobileNumber,
            Phone:      data.phoneNumber,
            Addresses:  AddressList,
            DOB:        data.dob,
            Email:      data.email,
        });
        var updates = []
        var updated = CustomerItem.update({_id: data._id}, newCustomer);
        updates.push(updated)
        Promise.all(updates).then(function(results){
            console.log(results);
            res.status(200).json({
                status: 'success',
                obj: results
            });
        });
    }else{

        let AddressList = [];
        if(data.address && data.address.length>0){
            data.address.forEach(element => {
                let add = new Object();
                add.Flat = element.flat;
                add.Street = element.street;
                add.State = element.state;
                add.Pincode = element.pincode;
                add._id=      null,
                console.log(add)
                AddressList.push(add);
            });
           
        }
        var newCustomer = new CustomerItem({
            _id:        null,
            Name:       data.fullName,
            Mobile:     data.mobileNumber,
            Phone:      data.phoneNumber,
            Addresses:  AddressList,
            DOB:        data.dob,
            Email:      data.email,
        });
        newCustomer.save(function(err, result){
            console.log('resultsave--', result, err)
            if(err){
                return res.status(500).json({
                    title : 'An error occurred',
                    error: err
                });		
            }
            console.log('Save successful')
            res.status(200).json({
                status: 'success',
                obj: result
            });
        });
    }
    
    
});

router.post('/delete',function(req, res, next){
    let list = req.body;
    
    CustomerItem.remove({'_id':{'$in':list}}, 
    function (err, result){ 
       if(err){
        return res.status(500).json({
            title : 'An error occurred',
            error: err
        });		
       }
       console.log('Delete success', result)
       res.status(200).json({
           status: 'success',
           obj: result
       });
      })
    
});
module.exports = router;