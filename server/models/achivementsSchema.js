const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const achievementSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the user who achieved it
      required: true,
    },
    score: {
      type: Number,
      required: true, // User's score in a given task
    },
    rankAchieved: {
      type: String,
      enum: ['Bronze', 'Silver', 'Gold'], // Example rank system
      default: 'Bronze',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room', // Optional: If the achievement was made in a specific room
    },
  });
  
  const Achievement = mongoose.model('Achievement', achievementSchema);
  module.exports = Achievement;
  