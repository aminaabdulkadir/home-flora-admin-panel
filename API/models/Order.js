const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema(
    {
    customer: {type: String, required: true},
    userId: {type: String, required: true},
    products: [ 
       {
           productId: {
            type: String
           },
           productName: {
               type: String
           }, 
           productImg: {
               type: String
           },
           quantity: {
               type: Number,
               default: 1
           }
       },
    ],
   total: {type: Number, required: true},
   address: {type: String, required: true},
   status: {type: String, default: 'pending'},
},
{timestamps: true} 

);

module.exports = mongoose.model( 'Order',  OrderSchema)