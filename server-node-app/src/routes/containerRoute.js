const express = require("express");
const router = express.Router();
const containerConstroller = require('../controller/containerController.js')

// Home page route.
router.get("/",containerConstroller.getContainers);

// About page route.
router.post("/",containerConstroller.createContainer);

module.exports = router;