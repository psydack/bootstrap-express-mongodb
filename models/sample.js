const mongoose = require("mongoose");

const SampleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Insert a title"]
  },
  distributionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Sample", SampleSchema, "samples");
