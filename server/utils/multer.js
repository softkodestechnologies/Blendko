const multer = require('multer');
const path = require('path');

const destination = path.join(__dirname, '..', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        message: 'Invalid image type. Only jpg, png image files are allowed.',
      },
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,     
});

// Use upload.fields to handle multiple types of uploads in a single form
const uploadMultiple = upload.fields([
  { name: 'images', maxCount: 6 },
  { name: 'patterns', maxCount: 6 } 
]);

module.exports = {
  upload,
  uploadMultiple,
};
