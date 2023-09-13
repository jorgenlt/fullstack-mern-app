import mongoose from "mongoose";

// Define post schema with mongoose.Schema function.
const postSchema = mongoose.Schema(
  {
    // User ID: required field, must be a string
    userId: {
      type: String,
      required: true,
    },
    // First name: required field, must be a string
    firstName: {
      type: String,
      required: true,
    },
    // Last name: required field, must be a string
    lastName: {
      type: String,
      required: true,
    },
    // Location: optional field, can be a string
    location: String,
    // Description: optional field, can be a string
    description: String,
    // Picture path: optional field, can be a string
    picturePath: String,
    // User's picture path: optional field, can be a string
    userPicturePath: String,
    // Likes: map structure to store likes. Key is userID and Value is boolean indicating whether the user liked the post or not
    likes: {
      type: Map,
      of: Boolean,
    },
    // Comments: array to store comments. Default value is an empty array
    comments: {
      type: Array,
      default: [],
    },
  },
  // Automatically include createdAt and updatedAt fields
  { timestamps: true }
);

// Create a model from the schema and assign it to the variable Post
// 'Post' is the name of the collection in the MongoDB database
const Post = mongoose.model("Post", postSchema);

export default Post;
