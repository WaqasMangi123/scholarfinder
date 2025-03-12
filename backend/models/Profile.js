const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Reference to the User model
    },
    fullName: {
        type: String,
        required: true
    },
    address: String,
    email: {
        type: String,
        required: true,
        unique: true // Ensures no two profiles have the same email
    },
    phoneNumber: String,
    objective: String,
    profileImage: String // URL or path to the profile image
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
