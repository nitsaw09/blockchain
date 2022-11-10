const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const users = require("./src/routes/users");
const kyc = require("./src/routes/kyc");

const app = express();
app.use(express.json())

require('./src/models');
require('./src/utils/consumers');

app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Routes
var router = express.Router();
router.use("/user", users);
router.use("/kyc", kyc);

// Api prefix 
app.use("/api/v1", router);

// handling 404 error
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// handling client & server error response
app.use((error, req, res, next) => {
  const resStatus = error.status || 500;
  res.status(resStatus).json({ error: error.message });
  next();
});

app.listen(4444, () => {
    console.log('app listen on port 4444');
});