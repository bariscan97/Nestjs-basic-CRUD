import { IsString, MinLength ,IsEmail,IsNotEmpty} from 'class-validator';

export class UserDto {
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    readonly username:string
    
    @IsNotEmpty()
    @IsString()
    email:string
    
    @IsEmail()
    @MinLength(8)
    @IsNotEmpty()
    @IsString()
    password:string

    @IsString()
    file : string
    
}
