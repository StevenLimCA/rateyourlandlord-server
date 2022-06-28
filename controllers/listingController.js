// const fs = require("fs");
const { LISTING_PATH, readFile, writeFile } = require("../utils/utils");

function getAllListing(_req, res) {
  readFile(LISTING_PATH, (data) => {
    if (!data) {
      res.status(404).send("Information not found");
    }
    const listings = JSON.parse(data);
    res.status(200).json(listings);
  });
}

module.exports = { getAllListing };
