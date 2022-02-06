// require dotenv
require("dotenv").config();
// requier necessary start functions
const express = require("express");
const startExpress = require("./configs/express");
const startMongo = require("./configs/mongo/mongo");
const startRouting = require("./configs/routing");

async function start() {
  const app = express();
  await startMongo();
  startRouting(app);
  startExpress(app);
}

start();
