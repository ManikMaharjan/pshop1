const express = require('express');
const app = express();
const cors= require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(cors());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With","Authorization");
    next();
 });
const productRoutes = require('./api/routes/product')
const orderRoutes=require('./api/routes/order');
mongoose.connect('mongodb://127.0.0.1:27017/shop',{
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

///////////////////////////////////corseing errot//////////////




//// routes handling/////
app.use('/product',productRoutes);
app.use('/order',orderRoutes);

///// eror handling///////////////

app.use((req,res,next)=>{
    const error =new Error('NOt found');
    error.status (404);
    next(error);
    
});
app.use((error,req,res,next)=>{
res.status(error.status || 500);
res.json({
    error:{
    message : error.message
}
});
});
/////// error handling/////////////////////////

module.exports = app;