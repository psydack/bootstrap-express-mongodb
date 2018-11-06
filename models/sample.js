const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
  title: {
    type: String,
    // default: ""
    required: [true, 'Insira um titulo.'],
  },
  distributionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sample", SampleSchema, "samples");
