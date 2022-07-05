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
  console.log(req.body);
  const { name, email, phone, address, price, lat, lng } = req.body;
  const newListing = {
    id: uuidv4(),
    name,
    email,
    phone,
    address,
    price,
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
function editListingById(req, res) {
  const { name, email, phone, address, price, lat, lng } = req.body;
  readFile(WAREHOUSE_PATH, (data) => {
    const allListings = JSON.parse(data);
    const listingFound = allListings.find(
      (listing) => listing.id == req.params.listingId
    );
    listingFound.name = name;
    listingFound.address = address;
    listingFound.email = email;
    listingFound.phone = phone;
    listingFound.price = price;
    listingFound.lat = lat;
    listingFound.lng = lng;
    fs.writeFile(LISTING_PATH, JSON.stringify(allListings), (err) => {
      err ? console.log(err) : console.log("Listing edited");
    });
    res.status(200).json(req.body);
  });
}
function deleteListingById(req, res) {
  readFile(LISTING_PATH, (data) => {
    const allListings = JSON.parse(data);
    const listingIndexFound = allListings.findIndex(
      (listing) => listing.id === req.params.listingId
    );
    if (listingIndexFound < 0) {
      res.status(404).send("nothing to delete");
    } else {
      allListings.splice(listingIndexFound, 1);
      fs.writeFile(LISTING_PATH, JSON.stringify(allListings), (err) => {
        err ? console.log(err) : console.log("listing deleted");
      });
      res.status(200).json(allListings);
    }
  });
}
function getListingDetailsById(req, res) {
  readFile(LISTING_PATH, (data) => {
    const ListingInfo = JSON.parse(data);
    const foundListingInfo = ListingInfo.find(
      (listing) => listing.id === req.params.listingId
    );
    if (!foundListingInfo) {
      res.status(404).send("Listing not found.");
    }
    res.status(200).send(foundListingInfo);
  });
}
module.exports = {
  deleteListingById,
  postNewListing,
  getAllListing,
  postReview,
  editListingById,
  getListingDetailsById,
};
