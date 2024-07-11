const multer = require("multer");
const maxSize = 10 * 1024 * 1024; // 10 MB
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});
var uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).array('file', 10);
module.exports = uploadFile;