const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("./mongo/model");

function startRouter(app) {
  router.get("/", async (req, res, next) => {
    console.log(req.body);
  });

  router.post("/signup", async (req, res, next) => {
    try {
      // console.log("body", req.body);
      const { name, password } = req.body;
      if (!name || !password)
        return res.status(400).json({ message: "name and password required" });
      const newUser = await User.findOne({ name: name });
      console.log(newUser);
      if (newUser !== null)
        return res.status(400).json({ message: "User Already in use" });

      // brcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await User.create({ name: name, password: hashedPassword });
      return res.status(200).json({ message: "signed up" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Neeeeeee" });
    }
  });

  router.post("/login", async (req, res, next) => {
    try {
      console.log(req.body);
      const { name, password } = req.body;
      if (!name || !password)
        return res.status(400).json({ message: "name and password required" });

      // brcrypt
      const user = await User.findOne({ name });
      const isValidUser = await bcrypt.compare(password, user.password);
      if (isValidUser) {
        const validUser = { name: user.name, _id: user._id };
        req.session.user = validUser;
        return res.status(200).json({ message: "logged in" });
      }
      return res.status(400).json({ message: "Thats not right!" });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  app.use("/", router);
}

module.exports = startRouter;
