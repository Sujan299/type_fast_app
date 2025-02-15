const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User', // The user who created the room
    required: true,
  },
  participants: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' }, // Users who joined the room
      socketId: { type: String, required: true }, // Track socket connection
      progress: Number,
      wpm: Number,
      completed: 
      {
        type: Boolean,
        default: false
      }
      ,
      // username: { type: String, required: true }, // Store username for quick access
      joinedAt: { type: Date, default: Date.now } // Track when they joined
    }
  ],
  isActive: {
    type: Boolean,
    default: true, // Whether the room is active or not
  },
  startTime: {
    type: Number,
    // required: true
  }
}, { timestamps: true }); // Automatically adds createdAt & updatedAt

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
