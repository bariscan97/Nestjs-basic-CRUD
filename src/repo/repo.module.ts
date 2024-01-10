import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { MysqlModule } from 'nest-mysql';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MysqlModule.forRoot({
    host: ConfigService.get<string>("db_host"),
    user: ConfigService.get<string>("db_user"),
    database: ConfigService.get<string>("database"),
    password: ConfigService.get<string>("db_password")
    
  })],
  
  providers: [RepoService],
  exports:[RepoService]
})
export class RepoMoudule {}
