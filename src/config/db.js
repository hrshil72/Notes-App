const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {}
};

module.exports = connectDB;
