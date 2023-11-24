const express = require ("express");
const app = express.Router();
const routes = require("./routes/routes");

app.use("/",  routes);

return app;