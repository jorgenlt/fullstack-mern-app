import mongoose from "mongoose";

// Define user schema with mongoose.Schema function.
const UserSchema = new mongoose.Schema(
  {
    // First Name: required field, must be a string between 2 and 50 characters.
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    // Last Name: required field, must be a string between 2 and 50 characters.
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    // Email: required field, must be unique and a string not more than 50 characters.
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    // Password: required field, must be a string with at least 5 characters.
    password: {
      type: String,
      required: true,
      min: 5,
    },
    // Picture Path: optional field, default value is an empty string.
    picturePath: {
      type: String,
      default: "",
    },
    // Friends: optional field, default value is an empty array.
    friends: {
      type: Array,
      default: [],
    },
    // Location: optional field, can be any string.
    location: String,
    // Occupation: optional field, can be any string.
    occupation: String,
    // Viewed Profile: optional field, counts the number of times the user's profile has been viewed.
    viewedProfile: Number,
    // Impressions: optional field, counts the number of impressions of the user's profile.
    impressions: Number,
  },
  {
    // Timestamps: enables automatic timestamps for createdAt and updatedAt fields.
    timestamps: true,
  }
);

// Create a model from the schema and assign it to the variable User
// 'User' is the name of the collection in the MongoDB database
const User = mongoose.model("User", UserSchema);

export default User;
