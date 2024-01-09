import { Injectable ,Inject ,forwardRef } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {RepoService} from "../repo/repo.service"

@Injectable()
export class UserService {
  constructor (@Inject(forwardRef(() => RepoService)) public repo:RepoService){}
  
  public async create(createUserDto: UserDto) {
    return await this.repo.createUser(createUserDto)
  }

  public async findAll() {
    return await this.repo.findAll()
  }

  public async findOne(id: number) {
    return await this.repo.getUserById(id);
  }

  public async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.repo.updateUser(id,updateUserDto);
  }

  public async remove(email: string) {
    return await this.repo.removeUserByEmail(email)
  }
}
