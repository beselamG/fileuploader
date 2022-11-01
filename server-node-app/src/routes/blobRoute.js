const express = require("express");
const router = express.Router();
const blobConstroller = require('../controller/blobController.js')

// Home page route.
router.get("/", blobConstroller.getBlobs);

router.get("/withVersion", blobConstroller.getBlobsWithVersions);

// About page route.
router.post("/",blobConstroller.uploadBlobs);

module.exports = router;