const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const {
  getAllListing,
  postReview,
  postNewListing,
} = require("../controllers/listingController");
router
  .route("/")
  .get(getAllListing)
  .post(upload.single("image"), postNewListing);
router.route("/:listingId/review").post(postReview);
module.exports = router;
