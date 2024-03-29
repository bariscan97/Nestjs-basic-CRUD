import { Module } from '@nestjs/common';
import { CloudinaryController } from './cloudinary.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';


@Module({
  imports: [
    
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
  ],
  providers: [CloudinaryService, CloudinaryProvider],
  exports: [CloudinaryService, CloudinaryProvider],
  controllers: [CloudinaryController],
})
export class CloudinaryModule {}
