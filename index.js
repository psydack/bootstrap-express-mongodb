// Default
// ===============================================================
// do not need this, but normally used
// const cors = require("cors");
// our server
const express = require("express");
// our database
const mongoose = require("mongoose");
// our port
// const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;

// MONGOOSE
// ===============================================================
mongoose.connect(
  // 'mongodb://localhost:27017/can_be_this',
  "mongodb+srv://bd-name:pass@mbd-url/table?retryWrites=true",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

// EXPRESS SERVER
// ===============================================================
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// if using cors see line 4
// app.use(cors());

// ROUTES
// ===============================================================
require("./routes/sample")(app);
// index route
app.get("", (req, res) => {
  res.json("Bem vindo");
});

// START
// ===============================================================
app.listen(port, err => {
  if (err) {
    console.log(err);
  }

  console.info(">>> 🌎 Open http://localhost:%s/api/ in your browser.", port);
});

// END
// ===============================================================
module.exports = app;
