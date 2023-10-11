require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index.js");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/", router);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
