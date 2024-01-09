import { Controller ,Get ,Post,Body ,Req ,UseInterceptors,UploadedFile,Res, UsePipes} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import {UserDto} from "../user/dto/user.dto"
import {CloudinaryService} from "../cloudinary/cloudinary.service"
import { Response ,Request} from  "express"
import { ValidatePipe } from 'src/pipes/validate-pipe/validate-pipe';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice:AuthService,
        private readonly cloudinaryService:CloudinaryService,
      ){}
    
    @Post("register")
    @UseInterceptors(FileInterceptor('file'))
    public async register(@UploadedFile() file: Express.Multer.File , @Body(ValidatePipe) userdatas:UserDto) {
        
        try{
            
            if (file){
              const fileUrl = await this.cloudinaryService.uploadFile(file);
              userdatas["file"] = fileUrl.url
          }

        }catch(err){
          throw err
        }
        const result = await this.authservice.register(userdatas)
        
        return result
        
      }
      @Post("login")
      public async login(@Req() req:Request , @Res() res:Response){
          const token = await this.authservice.login(req.body)
          console.log(token)
          return res
          .status(200)
          .cookie("access_token",token,{
              httpOnly:true,
              expires: new Date(Date.now()+10000000),
              secure: process.env.NODE_ENV === "development" ? false : true
          })
          .json({
            token:token,
            success:true
          })
      }
      @Post("logout")
      public logout(@Req() req:Request , @Res() res:Response){
        return res
        .status(200)
        .cookie("access_token","",{
            httpOnly:true,
            expires: new Date(Date.now()+10000000),
            secure: process.env.NODE_ENV === "development" ? false : true
        })
        .json({
          success:true
        })
      }




}
