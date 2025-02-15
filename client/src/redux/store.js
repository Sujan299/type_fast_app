// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userInformationReducer from './user/userInformationSlice'; // Import the reducer from userInformationSlice

// Configure the Redux store
const store = configureStore({
  reducer: {
    userInformation: userInformationReducer,  // Add the userInformation reducer to the store
  },
});

export default store;
