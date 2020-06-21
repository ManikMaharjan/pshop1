const express = require('express');
const router = express.Router();
const ProducModel= require('../models/productModel');
const ProductModel = require('../models/productModel');




router.get ('/', (req,res,next)=>{
res.status(200).json({
    message:'Handling GET request to /product'

});
});

router.post ('/', (req,res,next)=>{
   
 
    let product = new ProductModel({
        name:req.body.name,
        price:req.body.price

    });
    product.save();

    res.status(200).json({
        message:'Handling POST request to /product',
        product: product

    
    });
    });

    router.get('/:productId',(req,res,next)=> {
        const id = req.params.productId;
        if (id ==='special'){
            res.status(200).json({
                message: 'You are discovered',
                id:id

            });

        }else{
            res.status(200).json({
                message: 'You passed an id'
            });
        }

    });

    router.patch('/:productId',(req,res,next)=>{
        res.status (200).json({
            message: 'Updated'
         });
    });

    router.delete('/:productId',(req,res,next)=>{
        res.status(200).json({
            message: 'Deleted'
        })
    })
    module.exports=router;