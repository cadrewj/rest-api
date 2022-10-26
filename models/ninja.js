const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create geo location schema

const GeoSchema = new Schema({
  type: {
    default: "Point",
    type: String
  },
  coordinates: {
    type:[Number],
    index:"2dsphere"
  }
})


//create ninja Schema

const NinjaSchema = new mongoose.Schema({

  name:{
    type: String,
    required: [true, "Name field is required"],
  },
  rank:{
    type: String
  },
  available:{
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
})

// create the Model
const NinjaModel = mongoose.model("ninja", NinjaSchema);

module.exports = NinjaModel