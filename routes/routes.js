var express = require("express");
var router = express.Router();
var cors = require("cors");

var userController = require("../controllers/userController");
var resetController = require("../controllers/resetController");
var countController = require("../controllers/countController");

const corsOptions = {
    origin: "*",
    headers: "Content-Type,X-Requested-With, Authorization",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
}

router.use(cors(corsOptions)); 

router.use("/user", userController);

router.use("/reset", resetController);

router.use("/", countController);

module.exports = router;