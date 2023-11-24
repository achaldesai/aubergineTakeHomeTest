var express = require("express");
var router = express.Router();
var countSchema = require("../DBSchemas/countSchema");

var auth = require("../middlewares/auth").authMiddleware;

router.delete("/:name", auth, async (req, res) => {
    try {
        let name = req.params.name;
        
        let document = await countSchema.findOne({ name: name });

        if (document) {
            await countSchema.deleteOne({ name : name });
            return res.send("Document deleted successfully");
        } else {
            return res.send("Document not found");
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});

router.all("*", (req, res) => {
    return res.status(404).send("Invalid route");
});

module.exports = router;