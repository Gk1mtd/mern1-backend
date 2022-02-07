const express = require("express");
const cors = require("cors");
const sessions = require("express-session");
const MongoStore = require("connect-mongo");
const { PORT, ORIGIN, SECRET, MONGO_URL, NODE_ENV } = process.env;

async function startExpress(app) {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ credentials: true, origin: ORIGIN }));
    // session settings
    app.set('trust proxy', 1);
    app.use(
      sessions({
        secret: SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
          mongoUrl: MONGO_URL,
        }),
        cookie: {
          maxAge: 1000 * 60,
          sameSite: false,
          secure: NODE_ENV === "production",
        },
      })
    );

    app.listen(PORT, () => console.log(`Hey, Listen!!! ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

module.exports = startExpress;
