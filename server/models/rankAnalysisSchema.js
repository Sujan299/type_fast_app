const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rankAnalysisSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ranks: [
      {
        rank: {
          type: Number,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  });
  
  const RankAnalysis = mongoose.model('RankAnalysis', rankAnalysisSchema);
  module.exports = RankAnalysis;
  