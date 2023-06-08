const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose.connect(url).then(() => console.log("CONNECTED TO THE DATABASE"));
};

module.exports = connectDb;
