const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("./mongo/model");

function startRouter(app) {
  router.post("/signup", async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name || !password)
        return res.status(400).json({ message: "Das gibets doch nich!" });
      const newUser = User.findOne({ name });
      if (!newUser)
        return res.status(400).json({ message: "Das gibets och nich!" });

      // brcrypt
      const salt = bcrypt.genSalt(10);
      const hashedPassword = bcrypt.hash(password, salt);

      await User.create({ name: "Peter", password: hashedPassword });
      return res.status(200).json({ message: "signed up" });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  router.post("/login", async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name || !password)
        return res.status(400).json({ message: "Das gibets doch nich!" });

      // brcrypt
      const user = User.findOne({ name });
      const isValidUser = bcrypt.compare(password, user.password);
      if (isValidUser) {
        const validUser = { name: user.name, _id: user._id };
        req.session.user = validUser;
        return res.status(200).json({ message: "logged in" });
      }
      return res.status(400).json({ message: "nö" });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  app.use("/", router);
}

module.exports = startRouter;
