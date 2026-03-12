import { UnprocessableEntityException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';

export const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename(req, file, cb) {
      cb(null, `${v4()}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    if (!['image/jpeg', 'image/png'].includes(file.mimetype)) {
      return cb(new UnprocessableEntityException('Unsupported file type'), false);
    }

    cb(null, true);
  },
};
