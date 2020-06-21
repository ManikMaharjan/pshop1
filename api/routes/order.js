const express = require('express');
const router = express.Router();


router.get('/',(req ,res,next)=>{
res. status(200).json({
    message:'Order is fetch'
});
});
router.post('/',(req,res,next)=>{
    const order={
        orderId: req.body.orderId,
        price : req.body.price
    }
    res.status(201).json({
        message:'Order post',
        order: order
    });
});

router.get('/:orderId',(req,res,next)=>{
    res.status(200).jsaon({
        message:'Order recieved',
        orderId: req.params.orderId
    });
});
 router.delete('/:orderId',(req,res,next)=>{
res.status(200).json({
    message:'Order Deleted',
    orderId:req.params.orderId
});
 });





module.exports= router;
