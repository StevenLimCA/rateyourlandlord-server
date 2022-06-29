// const fs = require("fs");
const { LISTING_PATH, readFile, writeFile } = require("../utils/utils");

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

module.exports = { getAllListing };
