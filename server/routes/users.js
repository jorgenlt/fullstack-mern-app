import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";

// Importing verifyToken middleware function from auth middleware
import { verifyToken } from "../middleware/auth.js";

// Creating a new router object from the express module
const router = express.Router();

// Setting up a GET route at "/:id" 
// The verifyToken middleware is run first to authenticate the user
// If authentication passes, the getUser function is executed to fetch specific user details
router.get("/:id", verifyToken, getUser);

// Setting up a GET route at "/:id/friends"
// The verifyToken middleware is run first to authenticate the user
// If authentication passes, the getUserFriends function is executed to fetch friends of specific user
router.get("/:id/friends", verifyToken, getUserFriends);

// Setting up a PATCH route at "/:id/:friendId" for adding or removing a friend
// The verifyToken middleware is run first to authenticate the user
// If authentication passes, the addRemoveFriend function is executed
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

// Exporting the router object so it can be used by other modules
export default router;
