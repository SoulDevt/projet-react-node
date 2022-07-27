const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Mongo connected");
});

module.exports = mongoose;