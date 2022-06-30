const express = require("express");
const router = express.Router();
const {
  getAllListing,
  postReview,
} = require("../controllers/listingController");
router.route("/").get(getAllListing);
router.route("/:listingId/review").post(postReview);
module.exports = router;
