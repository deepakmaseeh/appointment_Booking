var mongoose = require("mongoose");

function dbConfig() {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => {
      console.log("error", error);
    });
}
module.exports = { dbConfig };