require("module-alias/register");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("@routes");

global.constants = require("@config/constants");

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
