const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['admin', 'superadmin', 'cashier', 'operational manager'],
        required: true
    },
    userId: {
        type: String,
        unique: true,
        required: true
    },
    branchId: {
        type: String,
        unique: true, // Ensure superadmin has a unique ID
        sparse: true, // Allows null values for other user types
        default: null // Set default value to null for other user types
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
