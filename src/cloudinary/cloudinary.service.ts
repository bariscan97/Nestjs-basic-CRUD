import { Injectable ,ForbiddenException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(new ForbiddenException(error));
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
  // async getThumbnail(publicId: string) {
  //   const thumbnailUrl = cloudinary.url(publicId, {
  //     resource_type: 'video',
  //     transformation: [
  //       {
  //         width: 300,
  //         height: 300,
  //         crop: 'fill',
  //       },
  //     ],
  //     format: 'png',
  //   });
  //   return thumbnailUrl;
  // }

  // async streamVideo(publicId: string) {
  //   const videoUrl = cloudinary.url(publicId, {
  //     resource_type: 'video',
  //     format: 'mp4',
  //     flags: 'streaming_attachment',
  //   });
  //   return videoUrl;
  // }
}
