const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const Ipfs = require('./src/utils/ipfs');
const fileUpload = require('express-fileupload');
require('./src/config/dotenv');

const ipfsInit = () => {
  const ipfs = new Ipfs();
  ipfs.initializeIpfs()
    .then(() => {
      console.log('IPFS initialized');
      global.IPFS = ipfs;
    })
    .catch(err => {
      console.log("IPFS reinitialized");
      ipfsInit();
    });
}
ipfsInit();

const nftRoutes = require("./src/routes/nft.js");

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

// setting CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept, Authorization"
  );
  next();
});

// Routes
var router = express.Router();
router.use("/nft", nftRoutes);

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
  res.status(resStatus).json({
    status: resStatus,
    error: {
      message: error.message
    }
  });
  next();
});

// connecting to mongoDB
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => console.log(err));

app.listen('5000', () => console.log(`app listen on port: 5000`));