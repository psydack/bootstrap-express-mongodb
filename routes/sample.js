// import sample model
const Sample = require("../models/sample");
// import crud handle
const CrudHandle = require("./crudHandle");
// exec our routes
module.exports = app => {
  CrudHandle(app, Sample, "samples");
};
