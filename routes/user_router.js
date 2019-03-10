const express = require('express');
const mongoose= require('mongoose');
const http=require('http');
var bodyParser=require('body-parser');
const app = express();
var router= express.Router();

module.exports=function(app,userSchema){

    router.get('/',function(req,res){
        console.log("-----[DEBUG START]-----/api/users");
        userSchema.find(function(err,data){
            console.log("-----Read All Users-----");
            if(err) {
                console.log("Error Finding Users");
                res.status(500).json(error);
            }
            else if(data==null){
                res.status(404).json(data); 
            }
            else {
                console.log(data);
                res.status(200).json(data);
            }
        });
        console.log("-----[DEBUG END]-----/api/users"); 
    });

    router.get('/:userId',function(req,res){
        console.log("-----[DEBUG START]-----/api/users/:userId");
        //var getEmail=req.body.email;
        var getId=req.params.userId;
        userSchema.findOne({authId:getId},function(err,data){
            if(err) {
                console.log(err);
                res.status(500).json({error: "Incorrect Id"});
            }
            if(data==null) res.status(404).json({error : "Unknown User"});
            else res.json(data);
        });
        console.log("-----[DEBUG END]-----/api/users/:userId");
    });
    
    router.post('/',function(req,res){
        console.log("-----[DEBUG START]-----/api/users/-----Post");
        var getId=req.body.userId;
        var getEmail=req.body.email;
        var getPassword=req.body.password;
        console.log(getEmail, getId, getPassword); 
        console.log(req.body);
        var obj={
            authId: getId,
            email: getEmail,
            password: getPassword
        };
        var newUser= new userSchema(obj);
        newUser.save(function(err,data){
           if(err) {
               console.log(err); 
                res.status(500).json(err);
            }
            else res.status(201).json(obj);
        });
        console.log("-----[DEBUG START]-----/api/users/-----Post");
    });

    router.put('/:userId',function(req,res){
        console.log("-----[DEBUG START]-----/api/users/:userId-----Put"); 
        var getId=req.params.userId;
        var getPassword= req.body.password;
        var date= new Date();
        userSchema.where({authId : getId}).update({password : getPassword, modify_date : date, istemppass: true},function(err,data){
            if(err){
                console.log(err);
                res.status(500).json(err);
            }
            else{
                res.status(202).json(data);
            }
        });
        console.log("----[DEBUG END]-----/api/users/:userId-----Put");
    });

    router.delete('/:userId',function(req,res){
        console.log("-----[DEBUG START]-----/api/users/:userId-----Delete"); 
        var getId=req.params.userId;
        userSchema.remove({authId:getId},function(err,data){
            if(err){
                console.debug(err);
                res.status(500).json(err);
            }
            else res.status(202).json(data);
        });
        console.log("-----[DEBUG END]-----/api/users/:userId-----Delete"); 
    });
    return router;
};