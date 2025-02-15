const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: function () {
            return !this.googleId
        }
    },
    image: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: function () {
            return !this.googleId
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows null for non-Google users
    },
    provider: {
        type: String,
        enum: ["local", "google"], // Track signup method
        default: "local"
    },
    achievements: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Achievement', // Linking to the Achievement collection
        },
    ],
    rank: {
        type: Number, // Can represent the user's rank
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;