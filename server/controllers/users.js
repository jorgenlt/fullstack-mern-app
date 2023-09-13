// Importing the User model
import User from "../models/User.js";

// Get a specific user based on ID
export const getUser = async (req, res) => {
  try {
    // Extracting the user ID from the request parameters
    const { id } = req.params;
    
    // Finding the user in the database using the extracted ID
    const user = await User.findById(id);
    
    // Sending a successful response with the found user
    res.status(200).json(user);
  } catch (err) {
    // Sending an error response when unable to find the user
    res.status(404).json({ message: err.message });
  }
};

// Get friends of a specific user
export const getUserFriends = async (req, res) => {
  try {
    // Extracting the user ID from the request parameters
    const { id } = req.params;
    
    // Finding the user in the database using the extracted ID
    const user = await User.findById(id);

    // Fetching all friends' data of the user from the database
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Formatting the final output for friend's list
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Sending a successful response with the formatted friend's list
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Sending an error response when unable to fetch the friend's list
    res.status(404).json({ message: err.message });
  }
};

// Add or remove a friend from a user's friend list
export const addRemoveFriend = async (req, res) => {
  try {
    // Extracting the user ID and friend ID from the request parameters
    const { id, friendId } = req.params;

    // Finding the user and friend in the database using the extracted IDs
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // Checking if both the user and friend exist
    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    // If friend already exists in the user's friend list, remove it. Otherwise, add it.
    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter(
        (friendIdInList) => friendIdInList !== friendId
      );
      friend.friends = friend.friends.filter(
        (userIdInList) => userIdInList !== id
      );
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    // Save the updated user and friend data in the database
    await user.save();
    await friend.save();

    // Fetch the updated friends' data of the user from the database
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // Formatting the final output for updated friend's list
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return { _id, firstName, lastName, occupation, location, picturePath };
      }
    );

    // Sending a successful response with the updated friend's list
    res.status(200).json(formattedFriends);
  } catch (err) {
    // Sending an error response when unable to update the friend's list
    res.status(404).json({ message: err.message });
  }
};
