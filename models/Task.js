const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, default: 0 }, // in minutes
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
