require("dotenv").config();
const fs = require("fs");
const { LISTING_PATH, readFile, writeFile } = require("../utils/utils");
const { v4: uuidv4 } = require("uuid");
const API_URL = "https://rateyourlandlord.herokuapp.com/images/";

function getAllListing(req, res) {
  console.log(process.env);
  readFile(LISTING_PATH, (data) => {
    if (!data) {
      res.status(404).send("Information not found");
    }

    let listings = JSON.parse(data);

    if (req.query.search !== undefined) {
      listings = listings.filter((Listing) => {
        return Listing.address
          .toLowerCase()
          .includes(req.query.search.toLowerCase());
      });
    }
    res.status(200).json(listings);
  });
}
function postReview(req, res) {
  readFile(LISTING_PATH, (data) => {
    const listingData = JSON.parse(data);
    console.log(req.params.listingId);
    const listingFound = listingData.find(
      (listing) => listing.id == req.params.listingId
    );

    const { rating, text, name } = req.body;
    const newReview = {
      id: uuidv4(),
      rating,
      text,
      name,
      timestamp: Date.now(),
    };
    listingFound.reviews.push(newReview);
    fs.writeFile(LISTING_PATH, JSON.stringify(listingData), (err) => {
      err ? console.log(err) : console.log("file written");
    });
    res.status(201).json(newReview);
  });
}

function postNewListing(req, res) {
  console.log("PostnewListing:" + JSON.stringify(req.body));
  console.log(API_URL + req.file.filename);
  const {
    name,
    address,
    postcode,
    phone,
    email,
    city,
    prov,
    country,
    lat,
    lng,
  } = JSON.parse(req.body.data);
  const newListing = {
    id: uuidv4(),
    name,
    address,
    postcode,
    phone,
    email,
    city,
    prov,
    country,
    lat,
    lng,
    postingDate: Date.now(),
    imgPath:
      "https://rateyourlandlord.herokuapp.com/images/" + req.file.filename,
    reviews: [],
  };
  writeFile(LISTING_PATH, newListing);
  res.status(201).json(newListing);
}
module.exports = { postNewListing, getAllListing, postReview };
