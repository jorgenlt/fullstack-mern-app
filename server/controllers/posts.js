import Post from "../models/Post.js";
import User from "../models/User.js";

// Create a new post
export const createPost = async (req, res) => {
  try {
    // Get information from the request body
    const { userId, description, picturePath } = req.body;

    // Finding a user by id
    const user = await User.findById(userId);

    // Creating a new post
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    // Saving the new post
    await newPost.save();

    // Fetching all posts
    const post = await Post.find();

    // Response with 201-Created and the created post
    res.status(201).json(post);
  } catch (err) {
    // Sending a response with status code 409 (Conflict) and the error message if an error occurs
    res.status(409).json({ message: err.message });
  }
};

// Get all posts
export const getFeedPosts = async (req, res) => {
  try {
    // Fetching all posts
    const post = await Post.find();

    // Response with 200-OK and the fetched posts
    res.status(200).json(post);
  } catch (err) {
    // Sending a response with status code 404 (Not Found) and the error message if an error occurs
    res.status(404).json({ message: err.message });
  }
};

// Get all the posts of a specific user
export const getUserPosts = async (req, res) => {
  try {
    // Getting user id from request params
    const { userId } = req.params;

    // Fetching all posts of a specific user
    const post = await Post.find({ userId });

    // Sending a response with status code 200 (OK) and the fetched posts
    res.status(200).json(post);
  } catch (err) {
    // Sending a response with status code 404 (Not Found) and the error message if an error occurs
    res.status(404).json({ message: err.message });
  }
};

// Update likes. Like or unlike a post
export const likePost = async (req, res) => {
  try {
    // Get post ID from request params and user id from request body
    const { id } = req.params;
    const { userId } = req.body;

    // Fetching the post by its ID
    const post = await Post.findById(id);

    // Checking if the post is already liked by the user
    const isLiked = post.likes.get(userId);

    // If the post is already liked, then unlike it. If not, then like it
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Updating the post's likes
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    // Sending a response with status code 200 (OK) and the updated post
    res.status(200).json(updatedPost);
  } catch (err) {
    // Sending a response with status code 404 (Not Found) and the error message if an error occurs
    res.status(404).json({ message: err.message });
  }
};
