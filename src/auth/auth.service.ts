import { Injectable , ForbiddenException , Inject ,forwardRef} from '@nestjs/common';
import { RepoService } from 'src/repo/repo.service';
import * as bcrypt from 'bcrypt'
import {UserDto} from "../user/dto/user.dto"
import { Console } from 'console';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor (@Inject(forwardRef(() => RepoService))public readonly repo : RepoService,private readonly jwtService: JwtService){}
    
    public async register(userdto:UserDto){
        try{
            
            const salt = await bcrypt.genSalt(10)   
            const hashedPass =  await bcrypt.hash(userdto.password,salt)
            userdto.password = hashedPass
            const checkUser =  await this.repo.getUserByEmail(userdto.email)
            if (checkUser.length>0){
               throw new ForbiddenException('User already exist');
            }
            const result = await this.repo.createUser(userdto)
            return  result[0]
            
            
        }catch(err){
            console.log(err)
            throw  err 
            
        }
    }
    public async login(userdto:UserDto){
        try{

                const User =  await this.repo.getUserByEmail(userdto.email)
                console.log(User)
                if (User.length === 0){
                throw new ForbiddenException('User not exist');
                }

                const validated =  bcrypt.compare(userdto.password,User[0].password)
                if(!validated){
                    throw new ForbiddenException('Password not match'); 
                }
                return this.tokenService(User[0])
        }catch(err){
            console.log(err)
            throw err

        }
    }
    public async tokenService(userBody:UserDto){
        const payload ={
            ...userBody
        }
        
        const token = await this.jwtService.signAsync(payload,{
            expiresIn:"24d"
        })
        
        console.log("service",token)
        return token
    }
    

}
