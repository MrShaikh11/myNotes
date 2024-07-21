const mongoose = require("mongoose");

async function dbConn() {
  try {
    await mongoose.connect(
      "mongodb+srv://maazshaikh:12345@cluster0.ogvilvs.mongodb.net/myNotes"
    );
    console.log("Mongo DB connected successfully");
  } catch (error) {
    console.log("Mongo DB Connection error: " + error);
  }
}

module.exports = dbConn;
