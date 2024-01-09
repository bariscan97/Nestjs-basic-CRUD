import { Provider } from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: () => {
    cloudinary.config({
      cloud_name: "dj04l8bqu",
      api_key: "844395182187654",
      api_secret: "e-T5gmIuwm9imIfK63Zh3l6acD4",
    });
    return cloudinary;
  }
};
