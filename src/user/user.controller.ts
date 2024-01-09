import { Controller, Get, Post, Body, Patch, Param, Delete , Res ,Req,UseGuards,UseInterceptors,UploadedFile} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {AuthGuard} from "../guards/auth.guard" 
import { Request ,Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import {CloudinaryService} from "../cloudinary/cloudinary.service"




@Controller('')
export class UserController {
  constructor(private readonly userService: UserService ,private readonly cloudinaryservice:CloudinaryService) {}

  @Get(':id') 

  public async findOne(@Param('id') id: number) {
      return this.userService.findOne(Number(id));
  }


  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Patch('updateMe')
  public async update(@UploadedFile() file: Express.Multer.File ,@Req() req: Request,@Res() res:Response) {
    try{
      
      if (file){
        const fileUrl = await this.cloudinaryservice.uploadFile(file);
        req.body.file = fileUrl.url 
      }
    
    }catch(err){
      throw err
    }
    
    
    const result = await this.userService.update(req.user.id,req.body);
    return  res.status(200).json({
      data:result
    })
  }


  
  @UseGuards(AuthGuard)
  @Delete()
  public async  remove(@Req() req:Request,@Res() res :Response) {
    const result =  await this.userService.remove(req.user.email);
    return res
    .status(200)
    .cookie("access_token","",{
        httpOnly:true,
        expires: new Date(Date.now()+10000000),
        secure: process.env.NODE_ENV === "development" ? false : true
    })
    .json({
      token:null,
      success:true,
      
        
        
    })
  }
}
