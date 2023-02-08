const mongoose = require("mongoose");
const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((conn) => console.log(`MongoDB connected: ${conn.connection.host}`));
  // .catch((err) => console.log(`DB connection error: ${err.message}`));
};

module.exports = dbConnection;
