const express = require ("express");
const app = express();
const routes = require("./routes/routes");
const logger = require("./helpers/logger");

let server;

server = app.listen(process.env.port || 3000, (req, res) => {
    logger.info("Server connected successfully");
    console.log("Server connected successfully");
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

app.use("/",  routes);


