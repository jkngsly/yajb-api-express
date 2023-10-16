require("module-alias/register");

const express = require("express");
const session = require("express-session");
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

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    name: `yajb`,
    secret: "jasd8923hjnrsFAWwsr291uhdnasfnhuihuiAHUIFH789fh3",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // This will only work if you have https enabled!
      maxAge: 60000, // 1 min
    },
  })
);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
