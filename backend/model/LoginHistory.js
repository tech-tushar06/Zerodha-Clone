const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  action: {
    type: String,
    enum: ["login", "signup"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  },
  success: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("LoginHistory", loginHistorySchema);
