const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected');
  } catch (error) {
    console.log('DB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;