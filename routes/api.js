const express = require("express")
const router = express.Router();
const NinjaModel = require("../models/ninja")


//get a list of ninja from the database
router.get("/ninjas", function(req, res){

  NinjaModel.aggregate([{ 
    $geoNear: { 
      near: {
        type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      }, 
      spherical: true, 
      maxDistance: 200000, 
      distanceField: "dist.calculated" 
    } 
  }]).then(function(results){ 
      res.send(results); 
      console.log("GET Request")
    });
  

})
// add a new ninja
router.post("/ninjas", function(req, res, next){
  // console.log("POST Request", req.body)
  NinjaModel.create(req.body).then(function(ninja){
    res.send(ninja)

  }).catch(next)
 
})
// update a ninja
router.put("/ninjas/:id", function(req, res){
  NinjaModel.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
    NinjaModel.findOne({_id:req.params.id}).then(function(ninja){
      res.send(ninja)
    })
  })
  console.log("PUT Request")
 
})
//delete a ninja
router.delete("/ninjas/:id", function(req, res){
  console.log("DELETE Request", req.params.id)
  NinjaModel.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
    res.send(ninja)
  })
  
}) 


module.exports = router;