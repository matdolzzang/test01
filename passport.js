const passport=require('passport');
const User = require('./models/user');
const crypto = require('crypto');
const mongoose=require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var KakaoStrategy = require('passport-kakao').Strategy;
var FacebookStrategy= require('passport-facebook').Strategy;
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

var url='mongodb://13.125.245.186/mydb';

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });
    
    passport.deserializeUser(function(email, done) {
        console.log("deserialized: "+ email);
        User.findOne({email: email}, function(err, user) {
            if(!user) done('There is no user');
            else done(err, user);
        });
    });
};