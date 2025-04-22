const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: String,
  googleId: String,
});

const User = model("user", userSchema);

module.exports = User;
