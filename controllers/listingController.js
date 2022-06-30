const fs = require("fs");
const { LISTING_PATH, readFile } = require("../utils/utils");
const { v4: uuidv4 } = require("uuid");
function getAllListing(req, res) {
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

module.exports = { getAllListing, postReview };
