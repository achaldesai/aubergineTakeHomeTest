require('dotenv').config();
const db = require("./connectionFactory")(process.env.DBURL);

db.on("error", (err) => {
    console.log("Error while connecting primary DB", err);
});
db.once("open", () => {
    console.log("Primary DB Connected!!!");
});

module.exports = db;