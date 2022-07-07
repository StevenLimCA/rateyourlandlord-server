const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const listing = require("./routes/listing");
const server = process.env.LOCAL_SERVER;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

app.use("/listing", listing);
app.listen(port, () => {
  console.log(`Server is on ${server}`);
});
module.exports = app;
