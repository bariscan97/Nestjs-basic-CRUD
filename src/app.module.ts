import { Module ,forwardRef} from '@nestjs/common';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import {config} from "./config/config"
import {RouterModule} from "@nestjs/core"
import { PostsModule } from './posts/posts.module';



@Module({
  imports: [
            ConfigModule.forRoot({isGlobal:true,load:[config]}),
            CloudinaryModule,
            UserModule,
            AuthModule, 
            PostsModule
            
          ],
    })
export class AppModule {}
