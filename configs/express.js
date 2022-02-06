const express = require("express");
const cors = require("cors");
const { PORT, ORIGIN } = process.env;

async function startExpress(app) {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ credentials: true, origin: ORIGIN }));

    app.listen(PORT, () => console.log(`Hey, Listen!!! ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

module.exports = startExpress;
