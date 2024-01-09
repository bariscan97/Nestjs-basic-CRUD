import { Module  ,forwardRef} from '@nestjs/common';
import { AuthService  } from './auth.service';
import {AuthController} from "./auth.controller"
import { JwtModule } from '@nestjs/jwt';
import {RepoService} from "../repo/repo.service"
import { RepoMoudule } from 'src/repo/repo.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Module({
  providers: [AuthService,RepoService ,CloudinaryService],
  imports : [RepoMoudule
  
    ,JwtModule.registerAsync({
      useFactory: () => ({
        secret: "secret",
        signOptions: { expiresIn: '7d' },
      })
})],
  controllers:[AuthController]
  
})
export class AuthModule {}

