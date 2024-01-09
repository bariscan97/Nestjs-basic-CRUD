import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RepoService } from 'src/repo/repo.service';


@Injectable()
export class PostsService {
  constructor (private readonly reposervice:RepoService){}
  
  public async create(userId :number ,postbody:PostDto) {
    
    return await this.reposervice.CreatePostByUserId(userId,postbody);
  }

  public async findAll(uuid?:number) {
    if (uuid) {
      return await this.reposervice.GetAllPostUser(uuid)
    }
    return await this.reposervice.GetAllPost()
  }

  public async findOne(id: number) {
    return await this.reposervice.GetPostById(id)
  }

  public async update(userId:number,id: number, updatePostDto: UpdatePostDto) {
    return await this.reposervice.UpdatePostById(userId,id,updatePostDto)
  }

  public async remove(id: number, userId:number) {
    return await this.reposervice.RemovePostById(userId,id)
  }
}
