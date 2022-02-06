const express = require("express");
const router = express.Router();

const User = require("./mongo/model");

function startRouter(app) {
  router.get("/", async (req, res) => {
    try {
      console.log("In der Route /");
      return res.json({ key: "bla" });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  router.post("/signup", async (req, res) => {
    try {
      console.log("In der Route /signup");
      await User.create({ name: "Peter", password: "Fox" });
      return res.status(200).json({message: "signed up"});
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  router.post("/login", async (req, res) => {
    try {
      console.log("In der Route /login");
      return res.status(200).json({message: "logged in"});
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  app.use("/", router);
}

module.exports = startRouter;
