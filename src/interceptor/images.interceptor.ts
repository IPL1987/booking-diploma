import * as path from 'path';
import { v4 as uuid } from 'uuid';
import {
  HttpException,
  HttpStatus,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

export function MulterFilesInterceptor(): Type<NestInterceptor> {
  return FilesInterceptor('image', 10, {
    storage: diskStorage({
      destination: path.resolve(__dirname, './uploads'),
      filename: (req: any, file: any, cb: any) => {
        cb(null, `${uuid()}${path.extname(file.originalname)}`);
      },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        cb(null, true);
      } else {
        cb(
          new HttpException(
            `Unsupported file type ${path.extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST,
          ),
          false,
        );
      }
    },
  });
}
