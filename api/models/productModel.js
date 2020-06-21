const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
   
    name: String,
    price:Number
});
const ProductModel=mongoose.model('Product',productSchema);
module.exports =ProductModel;