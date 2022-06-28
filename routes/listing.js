const express = require("express");
const router = express.Router();
const { getAllListing } = require("../controllers/listingController");
router.route("/").get(getAllListing);

module.exports = router;
