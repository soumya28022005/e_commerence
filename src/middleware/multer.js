import multer from "multer";

// Configure multer storage
const upload = multer({
  storage: multer.memoryStorage(),
});

export default upload;