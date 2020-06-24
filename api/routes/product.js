const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const path = require('path');
const fs = require('fs')

const multer = require('multer');

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString() + file.originalname);

}
});


const upload = multer({storage :storage});
const ProductModel = require('../models/productModel');




router.get ('/', (req,res,next)=>{
    ProductModel.find()
    .exec()
    .then(data=>{
        console.log(data);
        res.status(200).json({
            message: 'Data' ,
            data:data
        })
    })
    .catch(err=>{

        res.status(500).json({
            error:err
        });
        

    });





});

router.post ('/',upload.single('image'), (req,res,next)=>{
   
 console.log(req.params)
    let product = new ProductModel({
        _id: mongoose.Types.ObjectId(),  
        name:req.body.name,
        price:req.body.price

    })
    product
    .save() 
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'ADDED' ,
            product: product
    })
})

    .catch(err => {console.log(err)
  
    res.status(500).json({
        error:err
    })
    
    
    });
   
   
  
   
    });
    router.get("/:productId",(req,res,next)=>{

        const id = req.params.productId;
        ProductModel.findById(id)
        .exec()
        .then(data=>{
            console.log(data);
            if(data){
            
                res.status(200).json(data);

            }else{
                
                res.status(404).json({
                    
                    messaage : ' No valid entry for tis id'

                })

                  }          
           

        })
        .catch(err=>{
             console.log('hi');
            
         
            res.status(500).json({error:err});
           
        });
    });

    

    router.patch('/:productId',(req,res,next)=>{
     const id=req.params.productId.toString();

        ProductModel.findByIdAndUpdate(id,req.body,{new :true})

        .exec()
        .then(result=>{
            res.status(200).json({
                name: result.name,
                price: result.price

            }) 
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
    //     
     })
       
 
 
    router.delete('/:productId',(req,res,next)=>{
        const id = req.params.productId;
        ProductModel.remove({_id:id})
        .exec()
        .then(data=>{
            res.status(200).json(data)
        })
        .catch(err=>{
            res.status(500).json({
                error:err
            })
        })
     
    })
    module.exports=router;