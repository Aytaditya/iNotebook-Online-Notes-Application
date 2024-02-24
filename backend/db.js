const mongoose = require('mongoose');

const mongoUri = "mongodb://0.0.0.0:27017/inotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoUri, {
     
    });
    console.log("Connected to my MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;
