import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {RepoService} from "../repo/repo.service"
import { RepoMoudule } from 'src/repo/repo.module';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';


@Module({
  imports :[RepoMoudule,JwtModule.registerAsync({
    useFactory: () => ({
      secret: "secret",
      signOptions: { expiresIn: '7d' },
    }),
  })],
  controllers: [UserController],
  providers: [UserService,RepoService,CloudinaryService],
  
  
})
export class UserModule {}
