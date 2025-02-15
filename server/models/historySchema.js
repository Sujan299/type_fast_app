const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const historySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // The user who has this history record
    required: true,
  },
  achievements: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Achievement', // Linking to the achievements collection
    },
  ],
  sessionData: {
    type: Object, // Store session-specific details like accuracy, speed
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const History = mongoose.model('History', historySchema);
module.exports = History;
