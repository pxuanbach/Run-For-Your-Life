
const express = require('express')
const app = express()
const mongoose = require("mongoose")
const morgan=require('morgan')

// để xem log web
app.use(morgan("tiny"));

//Using enviroment variable 
require("dotenv").config();


//middleware
app.use(express.urlencoded()); // Parse URL-encoded bodies
app.use(express.json()); //to support JSON encode

var cors = require('cors');
app.use(cors());

var userRouter = require("./router/userRouter")
app.use("/api/users",userRouter);

var foodRouter = require("./router/foodRouter")
app.use("/api/food",foodRouter);

const connectString=process.env.connectString;
// kết nối database
mongoose
  .connect(connectString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((value) => {
    console.log("database connect success");
  })
  .catch((err) => {
    console.log(err);
  });




// để định nghĩa port 3000 - không thể thiếu

const PORT = process.env.PORT || 3000;
var server = app.listen(PORT, function () {
  var port = server.address().port;
  console.log("Express is working on port", port);
});



