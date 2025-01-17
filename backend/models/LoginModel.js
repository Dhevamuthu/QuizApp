const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const LoginSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,  // Store the path to the image file
        required: false
    }
});


LoginSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { //If the password has not been modified, we do not need to hash it again.
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10); // generates a salt for hashing the password. +++++++++ await ensures that the function waits for the salt generation to complete before proceeding.
        this.password = await bcrypt.hash(this.password, salt); // hashes the document's password using the generated salt.
        next();
    } catch (err) {
        next(err);
    }
});

const Login = mongoose.model("login", LoginSchema);
module.exports = Login;
