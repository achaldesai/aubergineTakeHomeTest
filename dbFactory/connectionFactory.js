const mongoose = require("mongoose");

module.exports = (url)  => {
    console.log(url);
    return mongoose.createConnection(url);    
}