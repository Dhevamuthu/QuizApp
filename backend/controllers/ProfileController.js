const Login = require("../models/LoginModel");

// Fetch User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const { userId } = req.user;  // Extract userId from the authenticated user

        // Find the user by their userId
        const user = await Login.findById(userId).select('-password'); // Exclude the password from the response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.user;  // Extract userId from the authenticated user
        const { username, email, password, profilePicture } = req.body;

        let updatedData = {
            username,
            email
        };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        if (profilePicture) {
            // Convert base64 image to a file if needed
            const base64Data = profilePicture.replace(/^data:image\/\w+;base64,/, "");
            const buffer = Buffer.from(base64Data, 'base64');
            const imagePath = `uploads/${userId}_profile.jpg`;
            fs.writeFileSync(imagePath, buffer);
            updatedData.profilePicture = imagePath;
        }

        await Login.findByIdAndUpdate(userId, updatedData, { new: true });
        res.json("User Profile Updated Successfully");
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

