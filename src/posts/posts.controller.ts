import { Controller ,Get ,Post,Body ,Req ,UseInterceptors,UploadedFile,Res,Param,Delete,Patch ,UseGuards,Query} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request,Response } from "express";
import {CloudinaryService} from "../cloudinary/cloudinary.service"
import { FileInterceptor } from '@nestjs/platform-express';

import {AuthGuard} from "../guards/auth.guard"

@Controller('posts')
export class PostsController {
  constructor(
  
      private readonly postsService: PostsService,
      private readonly cloudinaryService:CloudinaryService
  
  ){}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  public async create(@UploadedFile() file: Express.Multer.File ,@Req() req:Request ,@Res() res:Response) {
    
    try{
      
      if (file){
        const {url} = await this.cloudinaryService.uploadFile(file)
        req.body.imageUrl = url  
      }

    }catch(err){
         throw err
    }
  
    
    const result = await this.postsService.create(req.user.id,req.body)
    return   res.json({
      data:result
    })
  }

  @Get()
  public async findAll(@Query("uuid") uuid:number) {
    console.log(uuid,"asd")
    return await this.postsService.findAll(uuid);
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }
  
  
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  public async update(@Param('id') id: number,@UploadedFile() file: Express.Multer.File ,@Req() req:Request ,@Res() res:Response) {
    try{
      
      if (file){
        const {url} = await this.cloudinaryService.uploadFile(file)
        req.body.imageUrl = url  
      }

    }catch(err){
          throw err
    }
    const result = await this.postsService.update(req.user.id,id,req.body)
    return   res.json({
      data:result
    })
  }
  
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async remove(@Param('id') id: number ,@Req() req:Request ,@Res() res : Response) {
    
    const result = await this.postsService.remove(req.user.id,id);
    
    return res.status(200).json({
      data:result,
    })
  }
}

