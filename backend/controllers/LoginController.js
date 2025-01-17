const Login = require("../models/LoginModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");

// User Registration
exports.postuser = async (req, res) => {
    try {
        const { userId, username, email, password, profilePicture } = req.body;

        // Convert base64 image to a file if needed
        let imagePath = '';
        if (profilePicture) {
            const base64Data = profilePicture.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');
            imagePath = `uploads/${userId}_profile.jpg`;
            fs.writeFileSync(imagePath, buffer);
        }

        // Create a new user record with the profile picture
        const Logindetails = new Login({
            userId,
            username,
            email,
            password,  // Password should be hashed in pre-save middleware
            profilePicture: imagePath
        });

        await Logindetails.save();
        res.json("User Registered Successfully");
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// User Login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Login.findOne({ email });
        if (!user) {
            return res.status(404).json("No such user exists");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json("Invalid credentials");
        }

        const token = jwt.sign({ userId: user._id }, "secret key", {
            expiresIn: "5d"
        });
        
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json("Server error");
    }
};

