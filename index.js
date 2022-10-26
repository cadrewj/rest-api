// not to run a node server app you use the command: node + hostpage
// e.g: node index

const express = require("express");
const routes = require("./routes/api")
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
// setup express app
const app = express();

mongoose.connect("mongodb://localhost/ninjatogo")

mongoose.Promise = global.Promise; //mongoose promise is deprecated to need to set the promise to the global promise

app.use(express.static("./public"));
//used to grab data sent before the data reaches the route handler
app.use(bodyParser.json())

//initialize routes
app.use("/api",routes)// this tell node to use the routes you defined on the api page

//error handling middlware
app.use(function(err, req, res, next){
  console.log("Error MADE: ", err)
  res.status(422).send({error: err.message})

})

//listen for requess
app.listen(process.env.port || 3000, function(){
  console.log("listening....")
})