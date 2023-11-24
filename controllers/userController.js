var express = require("express");
var router = express.Router();

var model = require("../models/userModel");

router.post("/register", async (req, res) => {
    try {
        model.register(req, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                return res.status(200).send(result);
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Unexpected error occurred");
    }
});

router.get("/login", async (req, res) => {
    try {
        await model.login(req, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                return res.status(200).send(result);
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Unexpected error occurred");
    }
});

router.all("*", (req, res) => {
    return res.status(404).send("Invalid route");
});
module.exports = router;