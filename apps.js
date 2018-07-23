const express = require('express');
const path = require('path');
const router= express.Router();
const mongoose= require('mongoose');
const http=require('http');
var bodyParser=require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var userSchema= require('./models/user')
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended : false })); //이게 있어야  http data transfer 가능

var users= require('./routes/user_router')(app,userSchema)

app.use('/api/users',users);
app.set('port',process.envPORT || 3000);
app.set('views', __dirname + '/views_file');

app.use(express.static('public'));
app.use(express.static('models'));

app.use(session({ secret: '@#@$MYSIGN#@$#$', resave: false, saveUninitialized: true })); // 세션 활성화
app.use(passport.initialize()); // passport 구동
app.use(passport.session()); // 세션 연결

var options = {
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};

app.listen(3000,function(){
    console.log('Connected, 3000 port');
});

//var db = mongoose.connection;



/*
MongoClient.connect(url,options,function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.createCollection("customers", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
  });


var obj1={
    authId: "newUser1",
    email : "test1@test.com",
    password: "12345"
};

var newUser1= new userSchema(obj1);

newUser1.save(function(err,data){
    if(err) console.log(err);
    else console.log(data);
});

var obj2= {
    authId: "newUser2",
    email : "test2@test.com",
    password: "12345"
};
 
var newUser2= new userSchema(obj2);

newUser2.save(function(err,data){
    if(err) console.log(err);
    else console.log(data);
});

var obj3= {
    authId: "newUser3",
    email : "test3@test.com",
    password: "12345"
};

var newUser3= new userSchema(obj3);

newUser3.save(function(err,data){
    if(err) console.log(err);
    else console.log(data);
});



*/