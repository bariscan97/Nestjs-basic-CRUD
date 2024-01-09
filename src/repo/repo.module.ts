import { Module } from '@nestjs/common';
import { RepoService } from './repo.service';
import { MysqlModule } from 'nest-mysql';


@Module({
  imports: [MysqlModule.forRoot({
    host: 'localhost',
    user: 'root',
    database: 'mybase',
    password: "Dekar123."
    
  })],
  
  providers: [RepoService],
  exports:[RepoService]
})
export class RepoMoudule {}
