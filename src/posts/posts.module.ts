import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { RepoMoudule } from 'src/repo/repo.module';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {RepoService} from "../repo/repo.service"
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports:[RepoMoudule,JwtModule.registerAsync({
    useFactory: () => ({
      secret: "secret",
      signOptions: { expiresIn: '7d' },
    })
})],
  controllers: [PostsController],
  providers: [PostsService,CloudinaryService,RepoService],
  
})
export class PostsModule {}
