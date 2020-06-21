const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const cors= require('cors');
const productRoutes = require('./api/routes/product')
const orderRoutes=require('./api/routes/order');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

///////////////////////////////////corseing errot//////////////
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*"); //// Acessing my api
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
);
if( req.method === 'OPTION'){
    res.header('Acess-Control-Methods','PUT,POST,PATCH,DELETE,GET');
return res.status.json({});
}

next();    
});



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