const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

async function startMongo() {
  try {
    const { connection } = await mongoose.connect(MONGO_URL);
    console.log(`Connected to: ${connection.name}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = startMongo;
