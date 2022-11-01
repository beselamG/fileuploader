const express = require("express");
const router = express.Router();
const blobConstroller = require('../controller/blobController.js')

// Home page route.
router.get("/", blobConstroller.getBlobs);

// About page route.
router.post("/",blobConstroller.uploadBlobs);

module.exports = router;