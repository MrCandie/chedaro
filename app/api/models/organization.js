import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    administrator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: false,
    },
    employees: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: false,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Organization =
  mongoose.models.Organization || mongoose.model("Organization", schema);

export default Organization;
