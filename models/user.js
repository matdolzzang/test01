var express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
var MongoClient = require('mongodb').MongoClient;
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var url='';

mongoose.connect(url,function(err,db){
    if(err) console.log("failed to connect to db in user.js");
    console.log("success to connect to db in user.js"); 
});

function NameAlpabeticValidator(val){
    return val.match("^[a-zA-Z\(\)]+$");
}

const userSchema = new mongoose.Schema({
    authId : {type: String, required: true},
    password: { type: String, required: true, trim: true },
    salt : {type: String, required : false},
    email : { type: String, required: true, trim: true , validate:[ {validator : NameAlphabeticValidator,msg: "only enter alpabet"}]},
    nickname:  { type: String, required: false,  trim: true },
    create_date : Date,
    modify_date : Date,
    cart_id :{ type: String, required : false},
    //orderlist_id : {type:String, required : true},
    //preferproduct_id : {type: String, required : true},
    istemppass : { type: Boolean, default : false}
});

module.exports = mongoose.model('User', userSchema);

userSchema.methods.comparePassword = (user,password,cb) => {
    return hasher({password : password, salt : user.salt},function(err,pass,salt,hash){
        console.log("user:" +user);
        console.log("userpassword:" +user.password); 
        console.log("hash:" +hash);
        if(hash==user.password){
            cb(null,true);
        }else{
            cb('error');
        }
    })
   
 };

 userSchema.methods.checkTemporaryPassword=(user,cb)=>{
    if(user.istemppass) cb(null,true);
    else cb('not changed');
};


/*
crypto.pbkdf2('입력비밀번호', '기존salt', 100000, 64, 'sha512', (err, key) => {
    console.log(key.toString('base64') === '기존 비밀번호');
});
*/
