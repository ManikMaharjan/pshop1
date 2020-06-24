const express = require("express");
const router = express.Router();
const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

const UserModel=require('../models/userModel');
router.post('/signup',(req,res,next)=>{
    UserModel.find({email:req.body.email})
   
    .then(user=>{
        if (user.lenght >= 1){
        return res.status(409).json({
            message: 'user already taken'
      
    });
}else{
        bcrypt.hash(req.body.email,10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err
                });
            }else{
                const user= new UserModel({
                    email: req.body.email,
                    password: hash
                
                });
                user.save()
                .then(result=>{
                    res.status(400).json({
                        message: 'user created'
                    })
                })
                .catch(err=>{
                res.status(500).json(err)
                });
    
            }
        });
   
   

    }
});
});
 
router.delete('/:userId',(req,res,next)=>{
    UserModel.findByIdAndDelete(req.params.userId)
    
    .then(data=>{
        if (!data){
            return res.status(404).json({
                message:' User not valid'
            })
        }
        res.status(200).json({
            message: 'User deleted',
            user: data
        })
    });
});

module.exports =router;