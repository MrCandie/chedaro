import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Log = mongoose.models.Log || mongoose.model("Log", schema);

export default Log;
