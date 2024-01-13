const mongoose = require("mongoose");

//Connection to database
module.exports = async function connection() {
    try {
        await mongoose.connect(process.env.CLUSTER_URI);
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database");
    }
};