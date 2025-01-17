// backend/middlewares/upload.js
const multer = require('multer');
const path = require('path');

// Configure storage
var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });
  var upload = multer({ storage : storage}).single('profilePicture');

module.exports = upload;

