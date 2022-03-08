// var con = require("./connection");

// con.connect(function(error){
//    if(error) throw error;

//    con.query("select * from naruto",function(error,result){
//        if(error) throw error;
//        console.log(result);
//    })
// });


// cd Javascript
//node ministrylogged.js

var con = require('./connection')
var express = require('express');
var bodyParser = require('body-parser')
const  path  = require('path');
var app = express();
var PORT = 3000;
app.use('/images',express.static('images'))
app.use('/css',express.static('css'))

app.use(bodyParser.urlencoded({extended:false}))
// app.use('Education.html',express.static('Education.html'))
app.set('view engine','pug')

// app.get('/',function(req,res,next){
//    var options = {
//       root: path.join(__dirname)
//    };
//    var file = 'index.html'
//    res.sendFile(file,options,function(err){
//       if(err){
//         next(err);
//       }else{
//          console.log('Sent:',file);
//          next();
//       }
//    });
// });
// app.get('/',function(req,res){
//    console.log("File Sent");
//    res.send();
// });

app.get('/',function(req,res){
   res.sendFile(__dirname +'/index.html')
  
})

// On Submit Store Data to SQL Database
app.post('/submit',function(req,res){
   var state = req.body.State;
   var district = req.body.District;
   var department = req.body.Department;
   var date = req.body.Date;
   var problem = req.body.Problem;
   var pass= req.body.Password;
   
   con.connect(function(error){
     if(error) throw error;
    
   //   Insert data into the SQL Table
     var sql = "INSERT INTO naruto(State,District,Ministry,Date,Problem,password) VALUES('"+state+"','"+district+"','"+department+"','"+date+"','"+problem+"','"+pass+"')"
   
     con.query(sql,function(error,result){
      if(error) throw error;
      res.send('Sended sucessfully'+result.insertId)
     })
   });
})



app.listen(PORT,function(err){
   if(err)console.log(err);
   console.log("Server")
})