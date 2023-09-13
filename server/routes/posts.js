import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";

// Importing verifyToken middleware function from auth middleware
import { verifyToken } from "../middleware/auth.js";

// Creating a new router object from the express module
const router = express.Router();

// Setting up a GET route at the root ("/") 
// The verifyToken middleware is run first to authenticate the user
// If authentication passes, the getFeedPosts function is executed to fetch feed posts
router.get("/", verifyToken, getFeedPosts);

// Setting up a GET route at "/:userId/posts"
// The verifyToken middleware is run first to authenticate the user
// If authentication passes, the getUserPosts function is executed to fetch posts of specific user
router.get("/:userId/posts", verifyToken, getUserPosts);

// Setting up a PATCH route at "/:id/like" for liking a post
// The verifyToken middleware is run first to authenticate the user
// If authentication passes, the likePost function is executed
router.patch("/:id/like", verifyToken, likePost);

// Exporting the router object so it can be used by other modules
export default router;
