const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
// const isDev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 4000;

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(
  // 'mongodb://localhost:27017/can_be_this',
  "mongodb+srv://bd-name:pass@mbd-url/table?retryWrites=true",
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// DELAY FOR TEST LATENCY
// console.trace(
//     '****************** NAO ESQUECER DE REMOVER LATENCIA ****************',
// );
// app.use((req, res, next) => {
//     setTimeout(next, Math.random() * 3000);
// });

// API routes
require("./routes/sample")(app);

app.get("", (req, res) => {
  res.json("Bem vindo");
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  }

  console.info(">>> 🌎 Open http://localhost:%s/api/ in your browser.", port);
});

module.exports = app;
