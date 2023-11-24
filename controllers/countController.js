const express = require ("express");
const router = express.Router();

const countSchema = require("../DBSchemas/countSchema");

const counterFunction = (name) => {
    return countSchema.findOne({ name : name })
        .then (async (existingDocument) => {
            if (existingDocument) {
                existingDocument.count += 1;
                await existingDocument.save();
                return existingDocument.count;
            } else {
                const newDocument = new countSchema({ name, count: 1 });
                await newDocument.save();
                return newDocument.count;
            }
        }).catch ((error) => {
            console.error(error);
            throw error;
        });
};

router.get("/:name", async(req, res) => {
    let count = await counterFunction(req.params.name);
    return res.send({count : count});
});

module.exports = router;