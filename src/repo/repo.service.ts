import { HttpException, HttpStatus, Injectable   } from '@nestjs/common';
import mysql ,{Connection ,OkPacketParams, RowDataPacket} from "mysql2/promise"
import { InjectClient } from 'nest-mysql';
import  {UserDto} from "../user/dto/user.dto"
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { PostDto } from '../posts/dto/create-post.dto';
import {UpdatePostDto} from "../posts/dto/update-post.dto"




@Injectable()
export class RepoService {
   
    
    
    constructor(@InjectClient() private readonly connection: Connection  ) {}
    
    public async getUserById(id:number):Promise<UserDto[]>{
        
        try{
            
            const user =  await this.connection.query("SELECT * FROM users WHERE id = ?",[id])
            
            return user[0] as UserDto[]
        
        }catch(err){
            
            throw err
        }
        
       
    }
    public async getUserByEmail(email:string):Promise<UserDto[]>{
        
        try{
            
            const user = await this.connection.query('SELECT * FROM users WHERE email = ?',[email]);
            return user[0] as UserDto[]
        
        }catch(err){
            
            throw err
        }
        
       
    }

    public async findAll():Promise<UserDto[]>{
        
        try{
            
            const user = await this.connection.query('SELECT * FROM users');
            return user[0] as UserDto[]
        
        }catch(err){
        
            throw new Error("DATABASE ERROR")
        }
    }
    
    public async createUser(createUserDto:UserDto) : Promise<OkPacketParams>{
        
        try{
            const {username,email,password,file} = createUserDto
            const user = await this.connection.query('INSERT INTO users(username,password,email,file) VALUES(?,?,?,?)',[username,password,email,file])
            
            return  user as OkPacketParams
        
        }catch(err){
            console.log("CREATE HATALI")
            throw err
        
        }
    }
    public async updateUser(userId : number,UpdateUserDto:UpdateUserDto | any):Promise<OkPacketParams>{
        try{
            
            const {id,email,...updateData} = UpdateUserDto
            
            
            const query = `UPDATE users SET ${Object.keys(updateData).join("=? ,") + " =?"} WHERE id = ?`
            
            

            const user = await this.connection.query(query,[...Object.values(updateData),userId])
            
            const result = Object.assign({}, user[0]);
            
            return result as OkPacketParams
            
        }catch(err){
        
            throw err
        
        }
    }
    public async removeUserByEmail(email:string):Promise<OkPacketParams>{
        try{
            const query = `DELETE FROM users WHERE email = ?`
             
            const result = await this.connection.query(query,[email])

            return result[0]  as OkPacketParams
        
        }catch(err){
            console.log(err)
            throw err
        }
    }
    public async CreatePostByUserId(userId:number,postdto:PostDto) : Promise<OkPacketParams>{
        try{
            const {title,content,imageUrl} = postdto
            
            const query = `INSERT INTO posts(user_id,title,content,imageUrl) VALUES(?,?,?,?)`
            const result = await this.connection.query(query,[userId,title,content,imageUrl])

            return result[0] as OkPacketParams

        }catch(err){
            console.log(err)
            throw err
        }
        

    }
    public async UpdatePostById(userId:number,PostId:Number,postdto:UpdatePostDto | any) : Promise<OkPacketParams>{
        try{

            const {id,...others} = postdto
           
            const query = `UPDATE posts SET ${Object.keys(postdto).join("= ? ,") + " = ?"} WHERE id = ? and user_id = ?`
           
            const result = await this.connection.query(query,[...Object.values(others),PostId,userId])
            
            return result[0] as OkPacketParams    
        
        }catch(err){
            console.log(err)
            throw err
        }
    }
    public async RemovePostById(userId:number,PostId:Number) :Promise<OkPacketParams> {
        try{
            
            const query = `DELETE FROM posts WHERE id = ? and user_id = ?`
                
            const result = await this.connection.query(query,[PostId,userId])
            
            return result[0] as OkPacketParams   
        
        }catch(err){
            console.log(err)
            throw err
        }
    }
    public async GetPostById(PostId:number) : Promise<RowDataPacket>{
        try{
            
            const query = `SELECT * FROM posts WHERE id = ?`
        
            const result = await this.connection.query(query,PostId)
            
            return result[0]  as RowDataPacket
       
        }catch(err){
            console.log(err)
            throw err
        }

    }
    public async GetAllPost() : Promise<RowDataPacket[]>{
        try{
            
            const query = `SELECT * FROM posts`
        
            const result = await this.connection.query(query)
            
            return result[0]  as RowDataPacket[]
       
        }catch(err){
            console.log(err)
            throw err
        }

    }
    public async GetAllPostUser(uuid:number ):Promise<RowDataPacket[]>{
        try{
            const query = `SELECT * FROM posts WHERE user_id = ?`
        
            const result = await this.connection.query(query,[uuid])
            
            return result[0]  as RowDataPacket[]

        }catch(err){
            console.log(err)
            throw err
        }

    }
}
