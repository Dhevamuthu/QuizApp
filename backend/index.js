const express = require("express");
const app = express();
const categoryRoute = require("./routes/CategoryRoute"); // Adjust path if necessary

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors= require("cors");
mongoose.connect("mongodb+srv://dhevamuthu2004:dheva@quiz.rvn7rhd.mongodb.net/quizapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("Failed to connect to database", err);
});


//Serve static files from the uploads folder
// app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({
//     extended: false
//  }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", categoryRoute); // Use /categories as base route for categories

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
