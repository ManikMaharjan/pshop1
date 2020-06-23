const mongoose = require('mongoose')
const orderSchema=mongoose.Schema({
product:{type:mongoose.Schema.Types.ObjectId, ref: 'Product', required:true},
quality:{type :Number,default:1}
});
const OrderModel=mongoose.model('Order',orderSchema);
module.exports=OrderModel;