import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  
  Req,
  Body
  
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response ,Request} from 'express';
import { CloudinaryService } from './cloudinary.service';
import { json, text } from 'stream/consumers';

@Controller('videos')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    console.log(req.body.name)
    return this.cloudinaryService.uploadFile(file);
  }

  // @Get(':publicId/thumbnail')
  // async getThumbnail(
  //   @Param('publicId') publicId: string,
  //   @Res() res: Response,
  // ) {
  //   const thumbnailUrl = await this.cloudinaryService.getThumbnail(publicId);
  //   res.status(200).json({ thumbnailUrl });
  // }

  // @Get(':publicId/stream')
  // async streamVideo(@Param('publicId') publicId: string, @Res() res: Response) {
  //   const videoUrl = await this.cloudinaryService.streamVideo(publicId);
  //   res.status(200).json({ videoUrl });
  // }
}
