const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  password: String,
});

module.exports = model("User", UserSchema);
