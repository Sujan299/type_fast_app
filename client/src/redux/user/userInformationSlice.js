// src/redux/userInformationSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state to store user information
const initialState = {
  user: null,  // This will hold user data (profile image, id, etc.)
};

// Create slice to manage user information
const userInformationSlice = createSlice({
  name: 'userInformation',
  initialState,
  reducers: {
    // Action to set user data
    setUserInformation: (state, action) => {
      state.user = action.payload;
    },
    // Action to clear user data (logout)
    clearUserInformation: (state) => {
      state.user = null;
    },
  },
});

// Export actions to be used in components
export const { setUserInformation, clearUserInformation } = userInformationSlice.actions;

// Export the reducer to be used in the store
export default userInformationSlice.reducer;
