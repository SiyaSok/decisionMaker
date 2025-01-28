/** @format */

import mongoose from "mongoose";

const decisionSchema = new mongoose.Schema({
  inputVariables: Object,
  createdAt: { type: Date, default: Date.now },
});

const Decision =
  mongoose.models.Decision || mongoose.model("Decision", decisionSchema);

export default Decision;
