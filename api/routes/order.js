const express = require('express');
const router = express.Router();
const OrderModel=require('../models/orderModel');
const ProductModel=require('../models/productModel');
const { populate } = require('../models/orderModel');


router.get('/',(req ,res,next)=>{
    OrderModel.find()
    .select('product quality _id')
    .populate('product')
    .exec()
    .then(data=>{
        res.status(200).json({
            count:data.length,
            orders:data.map(data=>{
                return{
                    _id:data._id,
                    product:data.product,
                    quatity :data.quality,
                    request:{
                        types: 'Get',
                        url :'localhost:3000/order' +data
                    }
                }
            })
        })
    })
    .catch(err=>{
        res.send(500),json({
            error:err
        })
    })

});

router.post('/',(req,res,next)=>{
    ProductModel.findById(req.body.productId)
    .then(product=>{
        if(!product){
             res.status(404).json({
                message: 'Product not found'
            });
        }
        let order=new OrderModel({
   
            product:req.body.productId, 
           quality : req.body.quality
           
       
       })
        return order
       .save();

     

    })
    .then(data=>{
        res.status(201).json({
            message: 'it has been stored'

        })
    })
    .catch(err=>{
        res.status(500).json({
           message: 'No product found',
            error:err
        });
    });
  


   
});

router.get('/:orderId',(req,res,next)=>{
    OrderModel.findById(req.params.orderId)
    
    .exec()
    .then(data=>{
        res.status(200).json({
            message:'Order recieved',
            order:data,
            
            
                    request:{
                        types: 'Get',
                        url :'localhost:3000/order' +data
                    }
                
     
            
        });
    })
    .catch()
  
});

 router.delete('/:orderId',(req,res,next)=>{
     OrderModel.findByIdAndDelete(req.params.orderId)
     .populate('product')
     .then(data=>{
         if (!data){
             return res.status(404).json({
                 message:'order not found'
             })
         }
        res.status(200).json({
            message:'Order Deleted',
            orderId: data
     })

});
 });





module.exports= router;
