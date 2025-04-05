const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join("public", "temp")); // Saves to ./public/temp
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname); // Add timestamp to prevent name clashes
  },
});

const upload = multer({ storage: storage });

module.exports = upload;