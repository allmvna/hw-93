import * as multer from 'multer';
import * as path from 'path';

export const albumStorage = multer.diskStorage({
  destination: './public/uploads/albums',
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const filename = `${Date.now()}${extname}`;
    cb(null, filename);
  },
});

export const artistStorage = multer.diskStorage({
  destination: './public/uploads/artists',
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const filename = `${Date.now()}${extname}`;
    cb(null, filename);
  },
});
