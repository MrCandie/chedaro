import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: null,
      trim: true,
    },
    lastName: {
      type: String,
      default: null,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: [validator.isEmail, "enter a valid email address"],
    },
    userType: {
      type: String,
      trim: true,
      default: "user",
      enum: ["user", "admin", "employee"],
    },

    role: {
      type: String,
      trim: true,
      default: "user",
      enum: ["user", "admin"],
    },
    permissions: {
      type: Array,
      default: [],
    },

    password: {
      type: String,
      trim: true,
      minlength: [7, "Password cannot be less than 7 digits"],
      required: [true, "Password is required"],
      select: false,
    },

    organization: {
      type: mongoose.Schema.ObjectId,
      ref: "Organization",
      required: false,
    },

    status: {
      type: String,
      default: "active",
      enum: ["suspended", "archived", "active"],
    },
    lastLogin: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", schema);

export default User;
