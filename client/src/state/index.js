import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

// Auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Toggle light and dark mode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    // Logging in the user
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    // Logging out the user
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    // Setting friends of user
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("User has no friends.");
      }
    },
    // Setting posts
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    // Setting post
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }

        return post;
      });

      state.posts = updatedPosts;
    },
  },
});

// Exporting actions from auth slice
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;

// Exporting auth slice reducer function
export default authSlice.reducer;
