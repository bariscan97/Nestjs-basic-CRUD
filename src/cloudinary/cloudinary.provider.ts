import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: ConfigService.get<string>("cloud_name"),
      api_key: ConfigService.get<string>("api_key"),
      api_secret: ConfigService.get<string>("api_secret")
    });
    return cloudinary;
  }
};
